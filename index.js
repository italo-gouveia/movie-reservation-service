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

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
