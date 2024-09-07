const { Reservation, Seat, Showtime } = require('../models');
const logger = require('../logger'); // Import the logger

const reserveSeats = async (showtime_id, seat_ids, user_id) => {
    try {
        logger.info('Attempting to reserve seats', { user_id, showtime_id, seat_ids });

        // Check if the showtime exists
        const showtime = await Showtime.findByPk(showtime_id);
        if (!showtime) {
            logger.warn('Showtime not found', { showtime_id });
            throw new Error('Showtime not found');
        }
        logger.info('Showtime found', { showtime_id, showtime });

        // Check if the seats exist and are available
        const seats = await Seat.findAll({
            where: {
                id: seat_ids,
                showtime_id: showtime_id,
                is_reserved: false,
            },
        });

        logger.info('Seats available for reservation', { seats: seats.map(seat => seat.id) });

        if (seats.length !== seat_ids.length) {
            logger.warn('Some seats are not available or do not exist', {
                requestedSeats: seat_ids,
                availableSeats: seats.map(seat => seat.id),
            });
            throw new Error('Some seats are not available or do not exist');
        }

        // Reserve the seats
        const [affectedRows] = await Seat.update({ is_reserved: true }, {
            where: {
                id: seat_ids,
            },
        });

        logger.info('Seats updated to reserved', { affectedRows });

        // Create reservations
        const reservations = await Promise.all(seat_ids.map(seat_id => {
            return Reservation.create({ user_id, showtime_id, seat_id });
        }));

        logger.info('Reservations created', { reservations });

        return reservations;
    } catch (error) {
        logger.error('Error reserving seats', { message: error.message, stack: error.stack });
        throw error;
    }
};

const getReservations = async (user_id) => {
    try {
        logger.info('Fetching reservations for user', { user_id });

        const reservations = await Reservation.findAll({
            where: { user_id },
            include: [
                { model: Showtime, as: 'showtime' },
                { model: Seat, as: 'seat' },
            ],
        });

        logger.info('Reservations found', { reservations });

        return reservations;
    } catch (error) {
        logger.error('Error retrieving reservations', { message: error.message, stack: error.stack });
        throw error;
    }
};

const cancelReservation = async (id, user_id) => {
    try {
        logger.info('Attempting to cancel reservation', { id, user_id });

        // Find the reservation
        const reservation = await Reservation.findOne({
            where: { id, user_id },
            include: [
                { model: Seat, as: 'seat' },
            ],
        });

        if (!reservation) {
            logger.warn('Reservation not found or not authorized', { id, user_id });
            throw new Error('Reservation not found or not authorized');
        }

        // Check if the showtime is in the future
        const showtime = await Showtime.findByPk(reservation.showtime_id);
        if (showtime.start_time < new Date()) {
            logger.warn('Attempted to cancel a past reservation', { id, showtime_start_time: showtime.start_time });
            throw new Error('Cannot cancel past reservations');
        }

        // Cancel the reservation
        await Reservation.destroy({ where: { id } });

        // Mark the seat as available
        await Seat.update({ is_reserved: false }, {
            where: { id: reservation.seat_id },
        });

        logger.info('Reservation canceled', { id, seat_id: reservation.seat_id });

        return { message: 'Reservation canceled' };
    } catch (error) {
        logger.error('Error canceling reservation', { message: error.message, stack: error.stack });
        throw error;
    }
};

module.exports = {
    reserveSeats,
    getReservations,
    cancelReservation
};
