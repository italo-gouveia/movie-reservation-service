import dotenv from 'dotenv';
dotenv.config();

import process from 'process';

export const development = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT, // Ensure this is included
	dialect: 'postgres',
};
export const test = {
	username: process.env.TEST_DB_USER,
	password: process.env.TEST_DB_PASSWORD,
	database: process.env.TEST_DB_NAME,
	host: process.env.TEST_DB_HOST,
	port: process.env.TEST_DB_PORT, // Ensure this is included
	dialect: 'postgres',
};
export const production = {
	username: process.env.PROD_DB_USER,
	password: process.env.PROD_DB_PASSWORD,
	database: process.env.PROD_DB_NAME,
	host: process.env.PROD_DB_HOST,
	port: process.env.PROD_DB_PORT, // Ensure this is included
	dialect: 'postgres',
};
