import reservationService from '../services/reservationService';
import { error as _error } from '../logger'; // Import the logger

const reserveSeats = async (req, res) => {
	try {
		const { showtime_id, seat_ids } = req.body;
		const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

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
		});
		res.status(500).json({ message: 'Error reserving seats' });
	}
};

const getReservations = async (req, res) => {
	try {
		const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware
		const reservations = await reservationService.getReservations(user_id);
		res.status(200).json(reservations);
	} catch (error) {
		_error('Error in getReservations controller', {
			message: error.message,
			stack: error.stack,
		});
		res.status(500).json({ message: 'Error retrieving reservations' });
	}
};

const cancelReservation = async (req, res) => {
	try {
		const { id } = req.params;
		const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

		const result = await reservationService.cancelReservation(id, user_id);
		res.status(200).json(result);
	} catch (error) {
		_error('Error in cancelReservation controller', {
			message: error.message,
			stack: error.stack,
		});
		res.status(500).json({ message: 'Error canceling reservation' });
	}
};

export default {
	reserveSeats,
	getReservations,
	cancelReservation,
};
