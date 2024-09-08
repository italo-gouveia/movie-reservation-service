import { body, param, validationResult } from 'express-validator';
import xss from 'xss';
import reservationService from '../services/reservationService.js';
import { error as _error } from '../utils/logger.js'; // Import the logger

/**
 * Sanitize input using xss library.
 *
 * @param {string} input - The input string to be sanitized.
 * @returns {string} - The sanitized input string.
 */
const sanitizeInput = (input) => xss(input);

/**
 * Controller for reserving seats for a showtime.
 *
 * @type {Array<Function>}
 */
const reserveSeats = [
	// Validation and sanitization middleware
	body('showtime_id').isNumeric().withMessage('Showtime ID must be a number'),
	body('seat_ids')
		.isArray()
		.withMessage('Seat IDs must be an array of numbers'),
	body('seat_ids.*').isNumeric().withMessage('Each seat ID must be a number'),
	async (req, res, next) => {
		// Sanitize inputs
		req.body.showtime_id = sanitizeInput(req.body.showtime_id);
		req.body.seat_ids = req.body.seat_ids.map((id) => sanitizeInput(id));

		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { showtime_id, seat_ids } = req.body;
			const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

			if (!showtime_id || !seat_ids || seat_ids.length === 0) {
				throw new Error('Missing or invalid parameters');
			}

			const reservations = await reservationService.reserveSeats(
				showtime_id,
				seat_ids,
				user_id
			);
			res.status(201).json(reservations);
		} catch (error) {
			_error('Error in reserveSeats controller', {
				message: error.message,
				stack: error.stack,
				context: { body: req.body, ip: req.ip },
			});
			next(error); // Pass the error to the centralized error handler
		}
	},
];

/**
 * Controller for retrieving reservations for a user.
 *
 * @type {Array<Function>}
 */
const getReservations = [
	async (req, res, next) => {
		try {
			const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

			if (!user_id) {
				throw new Error('User ID is missing');
			}

			const reservations =
				await reservationService.getReservations(user_id);
			res.status(200).json(reservations);
		} catch (error) {
			_error('Error in getReservations controller', {
				message: error.message,
				stack: error.stack,
				context: { ip: req.ip },
			});
			next(error); // Pass the error to the centralized error handler
		}
	},
];

/**
 * Controller for canceling a reservation by ID.
 *
 * @type {Array<Function>}
 */
const cancelReservation = [
	// Validation middleware
	param('id').isNumeric().withMessage('Reservation ID must be a number'),
	async (req, res, next) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { id } = req.params;
			const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

			if (!id) {
				throw new Error('Reservation ID is missing');
			}

			const result = await reservationService.cancelReservation(
				id,
				user_id
			);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json({ message: 'Reservation not found' });
			}
		} catch (error) {
			_error('Error in cancelReservation controller', {
				message: error.message,
				stack: error.stack,
				context: { params: req.params, ip: req.ip },
			});
			next(error); // Pass the error to the centralized error handler
		}
	},
];

export default {
	reserveSeats,
	getReservations,
	cancelReservation,
};
