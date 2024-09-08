import logger from '../utils/logger';
import sequelize from './config'; // Ensure this imports your Sequelize instance

const initializeDatabase = async () => {
  try {
    // Use caution with force: true as it drops and recreates all tables
    await sequelize.sync({ force: true }); // Use migrations for production environments
    logger.info('Database synchronized successfully');
  } catch (error) {
    logger.error('Error initializing the database:', {
      message: error.message,
      stack: error.stack,
    });
  }
};

// Conditionally run the initialization only if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

export default initializeDatabase;
