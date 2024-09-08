import logger from '../utils/logger';
import { sync } from './config';

const initializeDatabase = async () => {
	try {
		await sync({ force: true }); // Use `force: true` to drop and recreate tables
		logger.log('Database synchronized');
	} catch (error) {
		logger.error('Error initializing the database:', error);
	}
};

initializeDatabase();
