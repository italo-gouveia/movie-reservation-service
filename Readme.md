Create a Migration File:
npx sequelize-cli migration:generate --name add-admin-user

Run the Migration:
npx sequelize-cli db:migrate

- Rollback the Migration:
npx sequelize-cli db:migrate:undo



npx sequelize-cli migration:generate --name create-movie
npx sequelize-cli migration:generate --name create-reservation
npx sequelize-cli migration:generate --name create-seat
npx sequelize-cli migration:generate --name create-showtime
npx sequelize-cli migration:generate --name create-user


 docker-compose exec app npx sequelize-cli db:migrate