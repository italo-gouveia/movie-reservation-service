import { verify } from 'jsonwebtoken';
import { User } from '../models';
import { error, warn } from '../logger'; // Import the logger
import process from 'process';

const verifyToken = (token) => {
	try {
		return verify(token, process.env.JWT_SECRET);
	} catch (err) {
		error('Token verification error', {
			message: err.message,
			stack: err.stack,
		});
		throw new Error('Invalid token');
	}
};

const getUserByToken = async (id) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			warn('User not found', { id });
			throw new Error('User not found');
		}
		return user;
	} catch (err) {
		error('Error fetching user by token', {
			message: err.message,
			stack: err.stack,
		});
		throw err;
	}
};

export default {
	verifyToken,
	getUserByToken,
};
