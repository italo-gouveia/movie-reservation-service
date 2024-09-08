import { Model, DataTypes } from 'sequelize';

/**
 * Reservation model representing user reservations for seats and showtimes.
 *
 * @extends Model
 */
export default (sequelize) => {
	class Reservation extends Model {}

	Reservation.init(
		{
			/**
			 * Time when the reservation was made. Defaults to the current time.
			 * @type {DataTypes.DATE}
			 */
			reservation_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'Reservation',
		}
	);

	return Reservation;
};
