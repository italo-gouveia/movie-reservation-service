import { Sequelize } from 'sequelize';
import { development, test, production } from './config';
import logger from '../utils/logger'; // Import the logger

const env = process.env.NODE_ENV || 'development';

const dbConfig = {
  development,
  test,
  production
}[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: (msg) => logger.info(msg), // Log queries using your logger
  pool: {
    max: 5, // Maximum number of connections in pool
    min: 0, // Minimum number of connections in pool
    acquire: 30000, // Maximum time (in ms) to wait for a connection
    idle: 10000 // Maximum time (in ms) that a connection can be idle before being released
  },
});

// Optional: Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1); // Exit the process with an error code
  }
})();

export default sequelize;
