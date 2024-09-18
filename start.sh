# start.sh

echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done

echo "PostgreSQL is up. Running migrations..."
npx sequelize-cli db:migrate --config config/config.js --migrations-path migrations

echo "Migrations completed. Starting the application..."
npm start
