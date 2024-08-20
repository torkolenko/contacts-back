import { Context } from "koa";
import { Contact } from "../models/Contact";

interface ContactRequestBody {
  name: string;
  surname: string;
  post: string;
}

export class ContactController {
  // Получение всех контактов
  static async getContacts(ctx: Context) {
    const contacts = await Contact.getAllContacts();

    ctx.body = contacts; // Устанавливаем полученные данные в тело ответа
  }

  // Получение контакта по ID
  static async getContactById(ctx: Context) {
    const { id } = ctx.params; // Извлекаем ID контакта из параметров маршрута
    const contact = await Contact.getContactById(id);

    ctx.body = contact;
  }

  // Создание нового контакта
  static async createContact(ctx: Context) {
    const { name, surname, post }: ContactRequestBody = ctx.request.body; // Деструктурируем данные из тела запроса
    const newContact = await Contact.createContact(name, surname, post);

    ctx.body = newContact;
    ctx.status = 201; // Устанавливаем статус ответа на 201 (Created)
  }

  // Обновление контакта по ID
  static async updateContact(ctx: Context) {
    const { id } = ctx.params;
    const { name, surname, post }: ContactRequestBody = ctx.request.body;
    const updatedContact = await Contact.updateContact(id, name, surname, post);

    ctx.body = updatedContact;
    ctx.status = 201; // Устанавливаем статус ответа на 201 (Created)
  }
}
