import dotenv from 'dotenv';
dotenv.config();

import process from 'process';

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
        username: process.env[`${envPrefix}_USER`] || 'defaultUser',
        password: process.env[`${envPrefix}_PASSWORD`] || 'defaultPassword',
        database: process.env[`${envPrefix}_NAME`] || 'defaultDatabase',
        host: process.env[`${envPrefix}_HOST`] || 'localhost',
        port: parseInt(process.env[`${envPrefix}_PORT`] || '5432', 10),
        dialect: 'postgres',
    };
};

/**
 * Configuration for the development environment.
 * @type {Object}
 * @property {string} username - The database username for development.
 * @property {string} password - The database password for development.
 * @property {string} database - The database name for development.
 * @property {string} host - The database host for development.
 * @property {number} port - The database port for development.
 * @property {string} dialect - The database dialect (e.g., 'postgres').
 */
export const development = getConfig('DEV');

/**
 * Configuration for the test environment.
 * @type {Object}
 * @property {string} username - The database username for testing.
 * @property {string} password - The database password for testing.
 * @property {string} database - The database name for testing.
 * @property {string} host - The database host for testing.
 * @property {number} port - The database port for testing.
 * @property {string} dialect - The database dialect (e.g., 'postgres').
 */
export const test = getConfig('TEST');

/**
 * Configuration for the production environment.
 * @type {Object}
 * @property {string} username - The database username for production.
 * @property {string} password - The database password for production.
 * @property {string} database - The database name for production.
 * @property {string} host - The database host for production.
 * @property {number} port - The database port for production.
 * @property {string} dialect - The database dialect (e.g., 'postgres').
 */
export const production = getConfig('PROD');
