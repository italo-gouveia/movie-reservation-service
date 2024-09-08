import { Model, DataTypes } from 'sequelize';

/**
 * Seat model representing individual seats in a theater.
 *
 * @extends Model
 */
export default (sequelize) => {
	class Seat extends Model {}

	Seat.init(
		{
			/**
			 * Number identifying the seat. Cannot be null.
			 * @type {DataTypes.STRING}
			 */
			seat_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			/**
			 * Indicates whether the seat is reserved. Defaults to false.
			 * @type {DataTypes.BOOLEAN}
			 */
			is_reserved: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'Seat',
		}
	);

	return Seat;
};
