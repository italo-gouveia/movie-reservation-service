import { Sequelize } from 'sequelize';
import { development, test, production } from './config.js';
import { info, warn, error as _error } from '../utils/logger.js';

/**
 * @typedef {Object} DbConfig
 * @property {string} database - The name of the database.
 * @property {string} username - The username to access the database.
 * @property {string} password - The password to access the database.
 * @property {string} host - The host where the database is running.
 * @property {number} port - The port on which the database is listening.
 * @property {string} dialect - The type of database (e.g., 'mysql', 'postgres').
 */

/**
 * Determines the database configuration based on the current environment.
 *
 * @constant {DbConfig}
 */
const env = process.env.NODE_ENV || 'development';

/**
 * @type {DbConfig}
 */
const dbConfig = {
	development,
	test,
	production,
}[env];

/**
 * Initializes a Sequelize instance with the database configuration.
 *
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
		dialect: dbConfig.dialect,
		logging: (msg) => info(msg), // Log queries using your logger
		pool: {
			max: 5, // Maximum number of connections in pool
			min: 0, // Minimum number of connections in pool
			acquire: 30000, // Maximum time (in ms) to wait for a connection
			idle: 10000, // Maximum time (in ms) that a connection can be idle before being released
		},
	}
);

// Optional: Test the connection
/**
 * Tests the connection to the database.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
(async () => {
	try {
		await sequelize.authenticate();
		info('Connection has been established successfully.');
	} catch (error) {
		error('Unable to connect to the database:', {
			message: error.message,
			stack: error.stack,
		});
		process.exit(1); // Exit the process with an error code
	}
})();

export default sequelize;
