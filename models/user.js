import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
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

	return User;
};
