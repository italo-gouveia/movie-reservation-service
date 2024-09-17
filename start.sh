#!/bin/sh
# start.sh

# Ensure the database is ready before running migrations
echo "Waiting for PostgreSQL to be ready..."

# Wait for the database to be ready
while ! nc -z postgres 5432; do
  sleep 1
done

echo "PostgreSQL is up. Running migrations..."

# Run database migrations with a direct config path
npx sequelize-cli db:migrate --config config/config.js --migrations-path migrations

# Start the application
npm start
