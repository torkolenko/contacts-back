import { Middleware } from "koa";
import { InvalidArgumentsError, AppError } from "../utils/errors";

// Middleware для построения ответа на запрос
export const responseBuilder: Middleware = async (ctx, next) => {
  try {
    await next();

    // Проверка на наличие ошибок
    if (!ctx.body) {
      ctx.throw(500, 'No response body');
    }

    // Установка статуса ответа
    ctx.status = 200;

    // Отправка JSON-ответа с данными
    ctx.body = { data: ctx.body };
  } catch (err: any) {
    let statusCode = 500;
    let errorMessage = 'unknown';

    if (err instanceof InvalidArgumentsError || err instanceof AppError) {
      statusCode = 400;
      errorMessage = err.message;
    }

    // Установка статуса ответа
    ctx.status = statusCode;

    // Отправка JSON-ответа с ошибкой
    ctx.body = { error: errorMessage };
  }
};