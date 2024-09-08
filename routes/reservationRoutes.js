import { Router } from 'express';
import reservationController from '../controllers/reservationController.js';
import authMiddleware from '../utils/authMiddleware.js'; // Import the default export
const { authenticate } = authMiddleware;

const router = Router();

/**
 * @route POST /reserve
 * @desc Reserve seats for a showtime
 * @access Private
 * @middleware authenticate
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The result of the reservation process
 */
router.post('/reserve', authenticate, reservationController.reserveSeats);

/**
 * @route GET /
 * @desc Get reservations for the authenticated user
 * @access Private
 * @middleware authenticate
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Array} - List of reservations for the user
 */
router.get('/', authenticate, reservationController.getReservations);

/**
 * @route DELETE /:id
 * @desc Cancel a reservation by ID
 * @access Private
 * @middleware authenticate
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @param {string} req.params.id - The ID of the reservation to cancel
 * @returns {Object} - Confirmation message of cancellation
 */
router.delete('/:id', authenticate, reservationController.cancelReservation);

export default router;
