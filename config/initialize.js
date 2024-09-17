import {info, error as _error} from '../utils/logger.js';
import sequelize from './sequelize.js'; // Ensure this imports your Sequelize instance

/**
 * Initializes the database by synchronizing the Sequelize models.
 *
 * **Note:**
 * - `force: true` will drop and recreate all tables. Use this option with caution and avoid using it in production environments.
 * - In production, prefer using migrations for database schema changes.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the database synchronization is complete.
 */
const initializeDatabase = async () => {
	try {
		// Use caution with force: true as it drops and recreates all tables
		await sequelize.sync({ force: true }); // Use migrations for production environments
		info('Database synchronized successfully');
	} catch (err) {
		_error('Error initializing the database:', {
			message: err.message,
			stack: err.stack,
		});
	}
};

// Conditionally run the initialization only if this file is executed directly
if (require.main === module) {
	initializeDatabase();
}

export default initializeDatabase;
