// models/showtime.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import the Sequelize instance

/**
 * Showtime model representing movie showtimes.
 *
 * @extends Model
 * @property {Date} start_time - Start time of the showtime.
 * @property {number} movie_id - The ID of the movie for the showtime.
 */
class Showtime extends Model {}

/**
 * Initialize the Showtime model.
 */
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
    tableName: 'Showtimes',
    timestamps: true,
  }
);

export default Showtime; // Default export of the Showtime model
