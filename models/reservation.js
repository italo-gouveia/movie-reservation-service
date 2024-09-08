import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Reservation extends Model {}

	Reservation.init(
		{
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
