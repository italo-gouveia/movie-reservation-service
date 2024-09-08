import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import the Sequelize instance

/**
 * Reservation model representing user reservations for seats and showtimes.
 *
 * @extends Model
 * @property {Date} reservation_time - Time when the reservation was made.
 * @property {number} user_id - The ID of the user who made the reservation.
 * @property {number} showtime_id - The ID of the showtime for the reservation.
 * @property {number} seat_id - The ID of the seat reserved.
 */
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
    // Add other properties as needed
  },
  {
    sequelize,
    modelName: 'Reservation',
  }
);

export default Reservation;
