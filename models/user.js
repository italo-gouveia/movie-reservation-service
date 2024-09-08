import { Model, DataTypes } from 'sequelize';

/**
 * User model representing users in the system.
 *
 * @extends Model
 */
export default (sequelize) => {
	class User extends Model {}

	User.init(
		{
			/**
			 * Username of the user. Must be unique and cannot be null.
			 * @type {DataTypes.STRING}
			 */
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			/**
			 * Password of the user. Cannot be null.
			 * @type {DataTypes.STRING}
			 */
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			/**
			 * Role of the user. Can be either 'admin' or 'user'. Defaults to 'user'.
			 * @type {DataTypes.ENUM}
			 */
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

	return User;
};
