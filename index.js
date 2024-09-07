const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { authenticate, authorize } = require('./utils/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/movies', authenticate, authorize(['admin']), movieRoutes);
app.use('/reservations', authenticate, reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
