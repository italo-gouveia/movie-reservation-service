import { Sequelize } from 'sequelize';
import config from './config';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
		dialect: dbConfig.dialect,
		logging: false, // Set to true for query logging
	}
);

export default sequelize;
