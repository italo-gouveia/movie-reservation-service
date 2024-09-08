import { Model, DataTypes } from 'sequelize';

/**
 * Showtime model representing movie showtimes.
 *
 * @extends Model
 */
export default (sequelize) => {
	class Showtime extends Model {}

	Showtime.init(
		{
			/**
			 * Start time of the showtime. Cannot be null.
			 * @type {DataTypes.DATE}
			 */
			start_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			/**
			 * Foreign key referencing the Movie model. Cannot be null.
			 * @type {DataTypes.INTEGER}
			 */
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
