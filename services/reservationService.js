import { Reservation, Seat, Showtime } from '../models';
import { info, warn, error as _error } from '../logger'; // Import the logger

const reserveSeats = async (showtime_id, seat_ids, user_id) => {
    try {
        info('Attempting to reserve seats', { user_id, showtime_id, seat_ids });

        const showtime = await Showtime.findByPk(showtime_id);
        if (!showtime) {
            warn('Showtime not found', { showtime_id });
            throw new Error('Showtime not found'); // Ensure this is handled by the middleware
        }
        info('Showtime found', { showtime_id, showtime });

        const seats = await Seat.findAll({
            where: {
                id: seat_ids,
                showtime_id: showtime_id,
                is_reserved: false,
            },
        });

        info('Seats available for reservation', {
            seats: seats.map((seat) => seat.id),
        });

        if (seats.length !== seat_ids.length) {
            warn('Some seats are not available or do not exist', {
                requestedSeats: seat_ids,
                availableSeats: seats.map((seat) => seat.id),
            });
            throw new Error('Some seats are not available or do not exist'); // Ensure this is handled by the middleware
        }

        const [affectedRows] = await Seat.update(
            { is_reserved: true },
            {
                where: {
                    id: seat_ids,
                },
            }
        );

        info('Seats updated to reserved', { affectedRows });

        const reservations = await Promise.all(
            seat_ids.map((seat_id) => {
                return Reservation.create({ user_id, showtime_id, seat_id });
            })
        );

        info('Reservations created', { reservations });

        return reservations;
    } catch (error) {
        _error('Error reserving seats', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const getReservations = async (user_id) => {
    try {
        info('Fetching reservations for user', { user_id });

        const reservations = await Reservation.findAll({
            where: { user_id },
            include: [
                { model: Showtime, as: 'showtime' },
                { model: Seat, as: 'seat' },
            ],
        });

        info('Reservations found', { reservations });

        return reservations;
    } catch (error) {
        _error('Error retrieving reservations', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const cancelReservation = async (id, user_id) => {
    try {
        info('Attempting to cancel reservation', { id, user_id });

        const reservation = await Reservation.findOne({
            where: { id, user_id },
            include: [{ model: Seat, as: 'seat' }],
        });

        if (!reservation) {
            warn('Reservation not found or not authorized', { id, user_id });
            throw new Error('Reservation not found or not authorized'); // Ensure this is handled by the middleware
        }

        const showtime = await Showtime.findByPk(reservation.showtime_id);
        if (showtime.start_time < new Date()) {
            warn('Attempted to cancel a past reservation', {
                id,
                showtime_start_time: showtime.start_time,
            });
            throw new Error('Cannot cancel past reservations'); // Ensure this is handled by the middleware
        }

        await Reservation.destroy({ where: { id } });

        await Seat.update(
            { is_reserved: false },
            {
                where: { id: reservation.seat_id },
            }
        );

        info('Reservation canceled', { id, seat_id: reservation.seat_id });

        return { message: 'Reservation canceled' };
    } catch (error) {
        _error('Error canceling reservation', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

export default {
    reserveSeats,
    getReservations,
    cancelReservation,
};
