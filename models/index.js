import sequelize from '../config/sequelize.js';
import User from './user.js';
import Showtime from './showtime.js';
import Seat from './seat.js';
import Reservation from './reservation.js';
import Movie from './movie.js';

/**
 * Defines the relationships between models.
 *
 * @remarks
 * This section establishes the associations between different models.
 */
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

Showtime.hasMany(Reservation, {
  as: 'reservations',
  foreignKey: 'showtime_id',
});
Reservation.belongsTo(Showtime, { as: 'showtime', foreignKey: 'showtime_id' });

Seat.hasMany(Reservation, { as: 'reservations', foreignKey: 'seat_id' });
Reservation.belongsTo(Seat, { as: 'seat', foreignKey: 'seat_id' });

Movie.hasMany(Showtime, { foreignKey: 'movie_id' });
Showtime.belongsTo(Movie, { foreignKey: 'movie_id' });

/**
 * Export all models and the Sequelize instance.
 *
 * @type {{
 *   User: Model,
 *   Showtime: Model,
 *   Seat: Model,
 *   Reservation: Model,
 *   Movie: Model,
 *   sequelize: Sequelize
 * }}
 */
export default {
  User,
  Showtime,
  Seat,
  Reservation,
  Movie,
  sequelize,
};
