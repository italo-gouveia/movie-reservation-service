/**
 * @module userService
 */

import authUtils from '../utils/authUtils.js';
import User from '../models/user.js';
import { info, warn, error as _error } from '../utils/logger.js';

/**
 * Creates a new user.
 * @function
 * @name createUser
 * @param {string} username - The username for the new user.
 * @param {string} password - The plain text password for the new user.
 * @param {string} [role] - Optional role for the new user.
 * @returns {Object} - The created user object.
 */
const createUser = async (username, password, role) => {
	try {
		const hashedPassword = authUtils.hashPassword(password);
		const user = await User.create({
			username,
			password: hashedPassword,
			role,
		});
		info('User created', {
			id: user.id,
			username: user.username,
			role,
		});
		return user;
	} catch (error) {
		_error('Error creating user', {
			message: error.message,
			stack: error.stack,
			context: { username },
		});
		throw new Error('Error creating user');
	}
};

/**
 * Finds a user by username.
 * @function
 * @name findUserByUsername
 * @param {string} username - The username of the user to find.
 * @returns {Object|null} - The user object if found, null otherwise.
 */
const findUserByUsername = async (username) => {
	try {
		const user = await User.findOne({ where: { username } });
		if (user) {
			info('User found', {
				id: user.id,
				username: user.username,
			});
		} else {
			warn('User not found', { username });
		}
		return user;
	} catch (error) {
		_error('Error finding user', {
			message: error.message,
			stack: error.stack,
			context: { username },
		});
		throw new Error('Error finding user');
	}
};

/**
 * Finds a user by their ID.
 * @function
 * @name findUserById
 * @param {string} id - The ID of the user to find.
 * @returns {Object|null} - The user object if found, null otherwise.
 */
const findUserById = async (id) => {
	try {
		return await User.findByPk(id);
	} catch (error) {
		_error('Error finding user by ID', {
			message: error.message,
			stack: error.stack,
			context: { id },
		});
		throw new Error('Error finding user');
	}
};

export default { createUser, findUserByUsername, findUserById };
