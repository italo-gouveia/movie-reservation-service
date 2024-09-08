import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Showtime extends Model {}

	Showtime.init(
		{
			start_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			movie_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Movies', // Ensure this matches the table name
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'Showtime',
		}
	);

	return Showtime;
};
