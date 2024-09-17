// config/config.js
import dotenv from 'dotenv';
dotenv.config();

/**
 * Retrieves database configuration settings based on the provided environment prefix.
 *
 * The function reads environment variables prefixed with the provided `envPrefix` and returns an object containing
 * database configuration settings. If an environment variable is not set, default values are used.
 *
 * @param {string} envPrefix - The prefix used to retrieve environment variables for the database configuration (e.g., 'DEV', 'TEST', 'PROD').
 * @returns {Object} An object containing database configuration settings:
 *   - {string} username - The database username.
 *   - {string} password - The database password.
 *   - {string} database - The database name.
 *   - {string} host - The database host.
 *   - {number} port - The database port.
 *   - {string} dialect - The database dialect (e.g., 'postgres').
 */
const getConfig = (envPrefix) => {
    return {
        username: process.env[`${envPrefix}_USER`] || 'postgres',
        password: process.env[`${envPrefix}_PASSWORD`] || 'your_password',
        database: process.env[`${envPrefix}_NAME`] || 'your_database_name',
        host: process.env[`${envPrefix}_HOST`] || 'postgres',
        port: parseInt(process.env[`${envPrefix}_PORT`] || '5432', 10),
        dialect: 'postgres',
    };
};

const config = {
    development: getConfig('DEV'),
    test: getConfig('TEST'),
    production: getConfig('PROD'),
};

export default config;