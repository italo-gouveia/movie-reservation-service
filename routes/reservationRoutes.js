import { Router } from 'express';
const router = Router();
import reservationController from '../controllers/reservationController';
import authenticate from '../utils/authMiddleware';

// Apply authentication middleware
router.use(authenticate);

// Route to reserve seats
router.post('/reserve', reservationController.reserveSeats);

// Route to get all reservations for the logged-in user
router.get('/', reservationController.getReservations);

// Route to cancel a reservation by ID
router.delete('/:id', reservationController.cancelReservation);

export default router;
