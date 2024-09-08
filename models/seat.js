import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Seat extends Model {}

	Seat.init(
		{
			seat_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
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
