import reservationService from '../services/reservationService';
import { error as _error } from '../logger'; // Import the logger

const reserveSeats = async (req, res, next) => {
    try {
        const { showtime_id, seat_ids } = req.body;
        const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

        if (!showtime_id || !seat_ids || seat_ids.length === 0) {
            throw new Error('Missing or invalid parameters');
        }

        const reservations = await reservationService.reserveSeats(showtime_id, seat_ids, user_id);
        res.status(201).json(reservations);
    } catch (error) {
        _error('Error in reserveSeats controller', {
            message: error.message,
            stack: error.stack,
            context: { body: req.body, ip: req.ip },
        });
        next(error); // Pass the error to the centralized error handler
    }
};

const getReservations = async (req, res, next) => {
    try {
        const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

        if (!user_id) {
            throw new Error('User ID is missing');
        }

        const reservations = await reservationService.getReservations(user_id);
        res.status(200).json(reservations);
    } catch (error) {
        _error('Error in getReservations controller', {
            message: error.message,
            stack: error.stack,
            context: { ip: req.ip },
        });
        next(error); // Pass the error to the centralized error handler
    }
};

const cancelReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id; // Assuming user ID is added to the request by authentication middleware

        if (!id) {
            throw new Error('Reservation ID is missing');
        }

        const result = await reservationService.cancelReservation(id, user_id);
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
};

export default {
    reserveSeats,
    getReservations,
    cancelReservation,
};
