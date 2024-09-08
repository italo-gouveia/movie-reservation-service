import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import reservationRoutes from './routes/reservationRoutes';
import { authenticate, authorize } from './utils/authMiddleware';
import process from 'process';

const app = express();
app.use(json());

app.use('/auth', authRoutes);
app.use('/movies', authenticate, authorize(['admin']), movieRoutes);
app.use('/reservations', authenticate, reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
