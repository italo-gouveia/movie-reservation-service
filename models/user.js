import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import the Sequelize instance

/**
 * User model representing users in the system.
 *
 * @extends Model
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user (hashed).
 * @property {string} email - The email address of the user.
 * @property {string} role - The role of the user (e.g., admin, user).
 */
class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;  // Default export of the User model
