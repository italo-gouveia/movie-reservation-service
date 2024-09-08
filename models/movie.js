import { Model, DataTypes } from 'sequelize';

/**
 * Movie model representing movies available in the system.
 *
 * @extends Model
 */
export default (sequelize) => {
	class Movie extends Model {}

	Movie.init(
		{
			/**
			 * Title of the movie. Cannot be null.
			 * @type {DataTypes.STRING}
			 */
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			/**
			 * Description of the movie. Cannot be null.
			 * @type {DataTypes.TEXT}
			 */
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			/**
			 * URL of the movie poster. Cannot be null.
			 * @type {DataTypes.STRING}
			 */
			poster_url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			/**
			 * Genre of the movie. Can be any string value.
			 * @type {DataTypes.STRING}
			 */
			genre: {
				type: DataTypes.STRING, // Use ENUM if predefined genres
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Movie',
		}
	);

	return Movie;
};
