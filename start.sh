#!/bin/sh
# start.sh

# Run database migrations
npx sequelize-cli db:migrate

# Start the application
npm start
