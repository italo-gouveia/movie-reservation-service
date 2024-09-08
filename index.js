import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import reservationRoutes from './routes/reservationRoutes';
import { authenticate, authorize } from './utils/authMiddleware';
import { info, warn, error as _error } from '../logger';
import process from 'process';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from 'redis';
import sanitizeInputs from './middleware/sanitizeInputs';

const app = express();

/**
 * Creates a Redis client instance.
 * @type {redis.RedisClient}
 */
const redisClient = redis.createClient({
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || 6379,
});

/**
 * Handles Redis client errors.
 * @param {Error} err - The error object.
 */
redisClient.on('error', (err) => {
	_error('Redis error', { message: err.message, stack: err.stack });
});

/**
 * Configures rate limiting middleware for API requests.
 * Limits the number of requests from a single IP address.
 * @type {import('express-rate-limit').RateLimit}
 */
const apiLimiter = rateLimit({
	store: new RedisStore({
		client: redisClient,
		expiry: 15 * 60,
	}),
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again later.',
	headers: true,
});

// Apply rate limiting to all API routes
app.use(apiLimiter);

/**
 * Middleware to sanitize user inputs globally or on specific routes.
 * @type {import('./middleware/sanitizeInputs').sanitizeInputs}
 */
app.use(sanitizeInputs);

/**
 * Apply security-related HTTP headers using helmet.
 */
app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", 'https://trusted-cdn.com'],
		},
	})
);

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(json());

/**
 * Custom middleware to log request details and response times.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
app.use((req, res, next) => {
	req.requestId = uuidv4(); // Add a unique request ID
	req.startTime = Date.now(); // Record start time for response time calculation

	info(`Incoming request: ${req.method} ${req.url}`, {
		requestId: req.requestId,
	});

	res.on('finish', () => {
		info(
			`Request completed: ${req.method} ${req.url} - ${res.statusCode}`,
			{
				requestId: req.requestId,
				responseTime: `${Date.now() - req.startTime}ms`,
			}
		);
	});

	next();
});

/**
 * Health check route to verify server is up and running.
 * @route GET /health
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

/**
 * Route handlers for authentication-related endpoints.
 * @type {import('./routes/authRoutes')}
 */
app.use('/auth', authRoutes);

/**
 * Route handlers for movie-related endpoints.
 * Authentication and authorization required.
 * @type {import('./routes/movieRoutes')}
 */
app.use('/movies', authenticate, authorize(['admin']), movieRoutes);

/**
 * Route handlers for reservation-related endpoints.
 * Authentication required.
 * @type {import('./routes/reservationRoutes')}
 */
app.use('/reservations', authenticate, reservationRoutes);

/**
 * Error handling middleware for catching and logging errors.
 * @param {Error} err - The error object.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
app.use((err, req, res, next) => {
	_error('Internal server error', {
		requestId: req.requestId,
		message: err.message,
		stack: err.stack,
	});
	res.status(500).json({ message: 'Internal server error' });
});

/**
 * Global handler for uncaught exceptions.
 * @param {Error} err - The error object.
 */
process.on('uncaughtException', (err) => {
	_error('Uncaught Exception', {
		message: err.message,
		stack: err.stack,
	});
	process.exit(1); // Exit the process with an error code
});

/**
 * Global handler for unhandled promise rejections.
 * @param {any} reason - The reason for the rejection.
 * @param {Promise} promise - The promise that was rejected.
 */
process.on('unhandledRejection', (reason, promise) => {
	_error('Unhandled Rejection', {
		message: reason instanceof Error ? reason.message : reason,
		stack: reason instanceof Error ? reason.stack : null,
	});
	process.exit(1); // Exit the process with an error code
});

/**
 * Graceful shutdown handler for terminating the server.
 * @param {string} signal - The signal that triggered the shutdown.
 * @returns {Function} The shutdown handler function.
 */
const shutdown = (signal) => {
	return async () => {
		info(`Received ${signal}. Closing HTTP server gracefully...`);
		server.close(() => {
			info('HTTP server closed.');
			process.exit(0);
		});

		// Force shutdown after a timeout
		setTimeout(() => {
			info('Forcefully shutting down...');
			process.exit(1);
		}, 10 * 1000);
	};
};

process.on('SIGTERM', shutdown('SIGTERM'));
process.on('SIGINT', shutdown('SIGINT'));

/**
 * Starts the Express server on the specified port.
 * @param {number} PORT - The port number to listen on.
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	info(`Server running on port ${PORT}`);
});
