import { Router } from 'express';
import reservationController from '../controllers/reservationController';
import { authenticate } from '../utils/authMiddleware'; // Ensure you're importing the named export correctly

const router = Router();

// Apply authentication middleware to specific routes
router.post('/reserve', authenticate, reservationController.reserveSeats);
router.get('/', authenticate, reservationController.getReservations);
router.delete('/:id', authenticate, reservationController.cancelReservation);

export default router;
