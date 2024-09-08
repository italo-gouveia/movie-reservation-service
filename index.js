import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet'; // For security
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import reservationRoutes from './routes/reservationRoutes';
import { authenticate, authorize } from './utils/authMiddleware';
import { info, warn, error as _error } from '../logger'; // Import the logger
import process from 'process';
import { v4 as uuidv4 } from 'uuid'; // For generating request IDs
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from 'redis';

const app = express();

// Configure Redis client as needed
const redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
});

// Configure rate limit
const apiLimiter = rateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: 15 * 60, // 15 minutes
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Middleware setup
app.use(helmet()); // Adds security headers
app.use(json());

// Custom request logging middleware
app.use((req, res, next) => {
  req.requestId = uuidv4(); // Add a unique request ID
  req.startTime = Date.now(); // Record start time for response time calculation

  info(`Incoming request: ${req.method} ${req.url}`, { requestId: req.requestId });

  res.on('finish', () => {
    info(`Request completed: ${req.method} ${req.url} - ${res.statusCode}`, {
      requestId: req.requestId,
      responseTime: `${Date.now() - req.startTime}ms`
    });
  });

  next();
});

// Route handlers
app.use('/auth', authRoutes);
app.use('/movies', authenticate, authorize(['admin']), movieRoutes);
app.use('/reservations', authenticate, reservationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    _error('Internal server error', {
    requestId: req.requestId,
    message: err.message,
    stack: err.stack,
  });
  res.status(500).json({ message: 'Internal server error' });
});

// Global uncaught exception handler
process.on('uncaughtException', (err) => {
  _error('Uncaught Exception', {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1); // Exit the process with an error code
});

// Global unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  _error('Unhandled Rejection', {
    message: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : null,
  });
  process.exit(1); // Exit the process with an error code
});

// Graceful shutdown
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

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
