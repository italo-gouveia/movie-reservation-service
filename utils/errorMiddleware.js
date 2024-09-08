import logger from '../utils/logger.js';

/**
 * Centralized error-handling middleware for Express.
 * Logs error details and sends an appropriate response to the client.
 *
 * @param {Error} err - The error object that was thrown.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void} - Sends an error response to the client.
 */
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
