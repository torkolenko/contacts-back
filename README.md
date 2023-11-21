# Тестовое задание для бэкенд разработчика.


## Инициализация проекта
1. Клонируем репозиторий 
2. Устанавливаем зависимости npm
```sh
npm install
```
3. Создаём базу данных postgresql
```sh
psql -U postgres -h '127.0.0.1' -f tables.sql
```
Если база данных развёрнута нелокально,то в файле `src/index.ts` изменяем параметры подключения к БД.
4. После редактирования исходного кода и добавления необходимого функционала, собираем и запускаем проект командами:
```sh
npm run build
npm run app
```
При успешном запуске проекта в консоли должна появиться надпись:
```
2023-11-20 18:32:20 [app] info: Сервер запущен и прослушивает запросы на порт 5000 
```


## Задание
Необходимо отредактировать следующие файлы, так чтобы для нижеописанных маршрутов возвращались соответствующие данные.
- `src/routes.ts` - должен содержать описание маршрутов
- `src/controllers/ContactController.ts` - должен содержать логику обработки входящих запросов
- `src/models/Contact.ts` - должен содержать sql вызовы


- GET /api/contacts
```json
{"data":[{"cid":1,"name":"Иван","surname":"Иванов","post":"Менеджер","outgoing_calls_count":"3","incoming_calls_count":"3"},{"cid":2,"name":"Екатерина","surname":"Смирнова","post":"Ассистент","outgoing_calls_count":"1","incoming_calls_count":"3"},{"cid":3,"name":"Дмитрий","surname":"Петров","post":"Инженер","outgoing_calls_count":"2","incoming_calls_count":"2"},{"cid":4,"name":"Анастасия","surname":"Сидорова","post":"Аналитик","outgoing_calls_count":"3","incoming_calls_count":"1"},{"cid":5,"name":"Алексей","surname":"Волков","post":"Начальник","outgoing_calls_count":"1","incoming_calls_count":"3"},{"cid":6,"name":"Виктория","surname":"Лебедева","post":"Координатор","outgoing_calls_count":"2","incoming_calls_count":"0"},{"cid":7,"name":"Даниил","surname":"Ткачев","post":"Разработчик","outgoing_calls_count":"3","incoming_calls_count":"4"},{"cid":8,"name":"Елена","surname":"Соколова","post":"Дизайнер","outgoing_calls_count":"2","incoming_calls_count":"3"},{"cid":9,"name":"Сергей","surname":"Ковалев","post":"Бухгалтер","outgoing_calls_count":"1","incoming_calls_count":"0"},{"cid":10,"name":"Мария","surname":"Андреева","post":"Секретарь","outgoing_calls_count":"2","incoming_calls_count":"1"}]}
```
- GET /api/contacts/1
```json
{"data":{"cid":1,"name":"Иван","surname":"Иванов","post":"Менеджер","calls":[{"type":"outgoing","status":"ок","duration":3,"partyName":"Даниил Ткачев"},{"type":"incoming","status":"ок","duration":32,"partyName":"Алексей Волков"},{"type":"outgoing","status":"ок","duration":38,"partyName":"Алексей Волков"},{"type":"outgoing","status":"ок","duration":52,"partyName":"Елена Соколова"},{"type":"incoming","status":"ок","duration":64,"partyName":"Анастасия Сидорова"},{"type":"incoming","status":"ок","duration":77,"partyName":"Елена Соколова"}]}}
```

- POST /api/contacts
```json
Request body
{
    "name": "Мила",
    "surname": "Шапочкина",
    "post": "Директор"
}

Response body
{
    "data": {
        "cid": 17,
        "name": "Мила",
        "surname": "Шапочкина",
        "post": "Директор"
    }
}
```

- PUT /api/contacts/17
```json
Request body
{
    "name": "Мила",
    "surname": "Шапочкина",
    "post": "Директор отдела"
}

Response body
{
    "data": {
        "cid": 17,
        "name": "Мила",
        "surname": "Шапочкина",
        "post": "Директор отдела"
    }
}
```


