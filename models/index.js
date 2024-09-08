import sequelize from '../config/sequelize';
import User from './user';
import Showtime from './showtime';
import Seat from './seat';
import Reservation from './reservation';
import Movie from './movie';

// Define associations
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

export default { User, Showtime, Seat, Reservation, Movie, sequelize };
