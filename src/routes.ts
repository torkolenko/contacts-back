import Router from "koa-router";
import { requestLogger } from "./middlewares/requestLogger";
import { responseBuilder } from "./middlewares/responseBuilder";
import { ContactController } from "./controllers/ContactController";

const apiRouter = new Router({ prefix: "/api" });

apiRouter.use(responseBuilder);
apiRouter.use(requestLogger);

/* Определяем маршруты для работы с контактами 
    и вызываем соответствующие методы ContactController для обработки запросов */
apiRouter.get("/contacts", ContactController.getContacts);
apiRouter.post("/contacts", ContactController.createContact);
apiRouter.get("/contacts/:id", ContactController.getContactById);
apiRouter.put("/contacts/:id", ContactController.updateContact);

export default [apiRouter];
