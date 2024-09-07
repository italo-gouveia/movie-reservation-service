const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authenticate } = require('../utils/authMiddleware');

// Apply authentication middleware
router.use(authenticate);

// Route to reserve seats
router.post('/reserve', reservationController.reserveSeats);

// Route to get all reservations for the logged-in user
router.get('/', reservationController.getReservations);

// Route to cancel a reservation by ID
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
