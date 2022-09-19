## Установите модули для каждого сервера.
В папке server для запуска БД выполнить команду
npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all
## Для работы запустите 2 сервера:
из папки server (npm run dev) & client (npm start)
