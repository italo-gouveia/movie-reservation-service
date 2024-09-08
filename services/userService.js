import User from '../models';
import _default from '../utils/authUtils';
const { hashPassword, generateToken } = _default;
import logger from '../utils/logger';

const createUser = async (username, password, role) => {
	try {
		const hashedPassword = hashPassword(password);
		const user = await User.create({
			username,
			password: hashedPassword,
			role,
		});
		logger.info(
			`User created: ${JSON.stringify({ id: user.id, username: user.username })}`
		);
		return user;
	} catch (error) {
		logger.error('Error creating user:', error.message, {
			stack: error.stack,
		});
		throw new Error('Error creating user');
	}
};

const findUserByUsername = async (username) => {
	try {
		const user = await User.findOne({ where: { username } });
		if (user) {
			logger.info(
				`User found: ${JSON.stringify({ id: user.id, username: user.username })}`
			);
		} else {
			logger.warn(`User not found: ${username}`);
		}
		return user;
	} catch (error) {
		logger.error('Error finding user:', error.message, {
			stack: error.stack,
		});
		throw new Error('Error finding user');
	}
};

export default { createUser, findUserByUsername, generateToken };
