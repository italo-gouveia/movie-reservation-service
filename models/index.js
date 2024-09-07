const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('./user')(sequelize);
const Showtime = require('./showtime')(sequelize);
const Seat = require('./seat')(sequelize);
const Reservation = require('./reservation')(sequelize);
const Movie = require('./movie')(sequelize);

// Define associations
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

Showtime.hasMany(Reservation, { as: 'reservations', foreignKey: 'showtime_id' });
Reservation.belongsTo(Showtime, { as: 'showtime', foreignKey: 'showtime_id' });

Seat.hasMany(Reservation, { as: 'reservations', foreignKey: 'seat_id' });
Reservation.belongsTo(Seat, { as: 'seat', foreignKey: 'seat_id' });

Movie.hasMany(Showtime, { foreignKey: 'movie_id' });
Showtime.belongsTo(Movie, { foreignKey: 'movie_id' });

module.exports = { User, Showtime, Seat, Reservation, Movie, sequelize };
