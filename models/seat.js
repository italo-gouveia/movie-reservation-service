// models/seat.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import the Sequelize instance

/**
 * Seat model representing individual seats in a theater.
 *
 * @extends Model
 * @property {string} seat_number - Number identifying the seat.
 * @property {boolean} is_reserved - Indicates whether the seat is reserved.
 */
class Seat extends Model {}

/**
 * Initialize the Seat model.
 */
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

export default Seat; // Default export of the Seat model
