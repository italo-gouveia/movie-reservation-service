// logger.js
import {
	createLogger,
	format as _format,
	transports as _transports,
} from 'winston';

// Configure Winston logger
const logger = createLogger({
	level: 'info',
	format: _format.combine(_format.timestamp(), _format.json()),
	transports: [
		new _transports.Console(),
		new _transports.File({ filename: 'combined.log' }),
	],
});

export default logger;
