import {
	createLogger,
	format as _format,
	transports as _transports,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'; // Import DailyRotateFile

/**
 * Custom format for logging messages.
 *
 * @param {Object} info - The log information object.
 * @param {string} info.level - The log level (e.g., 'info', 'error').
 * @param {string} info.message - The log message.
 * @param {string} info.timestamp - The timestamp of the log.
 * @param {Object} [info.meta] - Additional metadata associated with the log.
 * @param {Object} [info.meta.context] - Context information to include in the log.
 * @returns {string} - The formatted log message.
 */
const customFormat = _format.printf(
	({ level, message, timestamp, ...meta }) => {
		let context = '';
		if (meta.context) {
			context = ` [Context: ${JSON.stringify(meta.context)}]`;
		}
		return `${timestamp} [${level}]${context} ${message}`;
	}
);

// Configure the logger
const logger = createLogger({
	level: 'info',
	format: _format.combine(_format.timestamp(), customFormat),
	transports: [
		new DailyRotateFile({
			filename: 'logs/application-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			level: 'info',
			format: _format.combine(_format.timestamp(), customFormat),
		}),
		new DailyRotateFile({
			filename: 'logs/error-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			level: 'error',
			format: _format.combine(_format.timestamp(), customFormat),
		}),
		new _transports.Console({
			format: _format.combine(_format.colorize(), _format.simple()),
		}),
	],
});

export const info = (...args) => logger.info(...args);
export const warn = (...args) => logger.warn(...args);
export const error = (...args) => logger.error(...args);
