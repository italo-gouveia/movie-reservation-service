import { createLogger, format as _format, transports as _transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'; // Import DailyRotateFile

// Custom format to include context information
const customFormat = _format.printf(({ level, message, timestamp, ...meta }) => {
    let context = '';
    if (meta.context) {
        context = ` [Context: ${JSON.stringify(meta.context)}]`;
    }
    return `${timestamp} [${level}]${context} ${message}`;
});

// Configure the logger
const logger = createLogger({
    level: 'info',
    format: _format.combine(
        _format.timestamp(),
        customFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
            format: _format.combine(
                _format.timestamp(),
                customFormat
            )
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
            format: _format.combine(
                _format.timestamp(),
                customFormat
            )
        }),
        new _transports.Console({
            format: _format.combine(
                _format.colorize(),
                _format.simple()
            )
        })
    ],
});

export default logger;
