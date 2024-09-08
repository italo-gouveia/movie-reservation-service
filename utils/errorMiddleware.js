// src/middleware/errorMiddleware.js
import logger from '../utils/logger';

// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error details
    logger.error('An error occurred:', {
        message: err.message,
        stack: err.stack,
        context: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        },
    });

    // Determine the status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send the response
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};

export default errorHandler;
