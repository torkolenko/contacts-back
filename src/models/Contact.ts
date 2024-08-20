import { Pool } from "pg";

interface CallModel {
  type: string;
  status: string;
  duration: number;
  partyName: string;
}

interface ContactModel {
  cid: number;
  name: string;
  surname: string;
  post: string;
  outgoing_calls_count?: string;
  incoming_calls_count?: string;
  calls?: Array<CallModel>;
}

export class Contact {
  static pool: Pool;

  static async getAllContacts(): Promise<ContactModel[]> {
    const query = `
      WITH selected_src AS (
          -- Подзапрос для подсчета количества исходящих звонков для каждого контакта
          SELECT src, COUNT(id) AS counted_src 
          FROM calls 
          GROUP BY src 
      ),
      selected_trg AS (
          -- Подзапрос для подсчета количества входящих звонков для каждого контакта
          SELECT trg, COUNT(id) AS counted_trg 
          FROM calls
          GROUP BY trg 
      )
      SELECT
          c.cid,
          c.name,
          c.surname,
          c.post,
          -- Количество исходящих звонков (0, если нет звонков)
          COALESCE(src.counted_src, 0) AS outgoing_calls_count,
          -- Количество входящих звонков (0, если нет звонков)
          COALESCE(trg.counted_trg, 0) AS incoming_calls_count
      FROM
          contacts c
      LEFT JOIN
          selected_src src ON c.cid = src.src --LEFT JOIN с результатом подзапроса, связываем по cid
      LEFT JOIN
          selected_trg trg ON c.cid = trg.trg
      ORDER BY
          c.cid;
    `;

    // Выполнение SQL-запроса к базе данных через пул соединений
    const result = await this.pool.query(query);
    return result.rows;
  }

  static async createContact(
    name: string,
    surname: string,
    post: string
  ): Promise<ContactModel> {
    const query =
      "INSERT INTO contacts (name, surname, post) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, surname, post];

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  static async updateContact(
    id: string,
    name: string,
    surname: string,
    post: string
  ): Promise<ContactModel | null> {
    const query =
      "UPDATE contacts SET name = $1, surname = $2, post = $3 WHERE cid = $4 RETURNING *";
    const values = [name, surname, post, id];

    const result = await this.pool.query(query, values);

    return result.rows[0] || null;
  }

  static async getContactById(id: string): Promise<ContactModel | null> {
    const query = `
      SELECT 
        c1.cid, c1.name, c1.surname
        ,json_agg( -- Агрегируем все связанные вызовы в JSON-массив
                json_build_object( -- Создаем JSON-объект для каждого вызова
                  'type', CASE WHEN src = $1 THEN 'outgoing'
                    WHEN trg = $1 THEN 'incoming' END,
                  'status', cs.status,
                  'duration', cs.duration,
                  'partyName', c2.name || ' ' ||c2.surname
                )
              ) AS calls
      FROM calls cs
      JOIN contacts c1 ON c1.cid = $1 -- Соединяем таблицу contacts с calls по cid
      -- Подтягиваем собеседника в итоговую таблицу по условию
      JOIN contacts c2 on c2.cid = CASE WHEN cs.src = $1 THEN cs.trg  
                                        WHEN cs.trg = $1 THEN cs.src END
      WHERE cs.src = $1 or cs.trg = $1
      GROUP BY c1.cid -- Группируем по cid для корректной агрегации JSON-массива
    `;
    const values = [id];

    const result = await this.pool.query(query, values);

    return result.rows[0] || null;
  }
}
