CREATE USER backend;
CREATE DATABASE backend OWNER backend;
GRANT ALL PRIVILEGES ON DATABASE backend TO backend;

CREATE TABLE IF NOT EXISTS calls (
	id SERIAL PRIMARY KEY,
	src INT NOT NULL,
	trg INT NOT NULL,
	status TEXT NOT NULL,
	duration INT
);

CREATE TABLE IF NOT EXISTS contacts (
	cid SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
	post TEXT NOT NULL
);

INSERT INTO contacts (name, surname, post)
VALUES
('Иван', 'Иванов', 'Менеджер'),
('Екатерина', 'Смирнова', 'Ассистент'),
('Дмитрий', 'Петров', 'Инженер'),
('Анастасия', 'Сидорова', 'Аналитик'),
('Алексей', 'Волков', 'Начальник'),
('Виктория', 'Лебедева', 'Координатор'),
('Даниил', 'Ткачев', 'Разработчик'),
('Елена', 'Соколова', 'Дизайнер'),
('Сергей', 'Ковалев', 'Бухгалтер'),
('Мария', 'Андреева', 'Секретарь');

INSERT INTO calls (src, trg, status, duration)
SELECT
  c1.cid AS src,
  c2.cid AS trg,
  CASE WHEN random() < 0.8 THEN 'ок' ELSE 'error' END AS status,
  CASE WHEN random() < 0.8 THEN random() * 600 END AS duration
FROM
  contacts c1, contacts c2
WHERE
  c1.cid <> c2.cid
ORDER BY
  random()
LIMIT
  20;