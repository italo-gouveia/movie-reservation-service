import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import the Sequelize instance

/**
 * Movie model representing movies available in the system.
 *
 * @extends Model
 * @property {string} title - The title of the movie.
 * @property {string} description - A brief description of the movie.
 * @property {string} poster_url - URL to the movie poster.
 * @property {string} genre - Genre of the movie.
 * @property {Date} releaseDate - Release date of the movie.
 */
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

export default Movie;
