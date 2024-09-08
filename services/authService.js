/**
 * @module authService
 */

import bcrypt from 'bcryptjs';  // Import the CommonJS module using default import
const { hashSync, compareSync } = bcrypt;  // Destructure the named exports from the default import
import jwt from 'jsonwebtoken';  // Import the CommonJS module using default import
const { sign, verify } = jwt;  // Destructure the named exports from the default import
import process from 'process';
import { info, warn, error as _error } from '../utils/logger.js';

/**
 * Hashes a plain text password.
 * @function
 * @param {string} password - The plain text password to hash.
 * @returns {string} - The hashed password.
 * @throws {Error} - Throws an error if hashing fails.
 */
const hashPassword = (password) => {
	try {
		const hashedPassword = hashSync(password, 10);
		info('Password hashed successfully', { context: { hashedPassword } });
		return hashedPassword;
	} catch (error) {
		_error('Error hashing password', {
			message: error.message,
			stack: error.stack,
			context: { password },
		});
		throw new Error('Error hashing password');
	}
};

/**
 * Compares a plain text password with a hashed password.
 * @function
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} - `true` if the passwords match, `false` otherwise.
 * @throws {Error} - Throws an error if comparison fails.
 */
const comparePassword = (password, hashedPassword) => {
	try {
		const isMatch = compareSync(password, hashedPassword);
		info('Password comparison result', { context: { isMatch } });
		return isMatch;
	} catch (error) {
		_error('Error comparing passwords', {
			message: error.message,
			stack: error.stack,
			context: { password },
		});
		throw new Error('Error comparing passwords');
	}
};

/**
 * Generates a JWT token for a user.
 * @function
 * @param {Object} user - The user object containing `id` and `role`.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.role - The role of the user.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - Throws an error if token generation fails.
 */
const generateToken = (user) => {
	try {
		const token = sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: '2h',
			}
		);
		info('Token generated successfully', { context: { userId: user.id } });
		return token;
	} catch (error) {
		_error('Error generating token', {
			message: error.message,
			stack: error.stack,
			context: { userId: user.id },
		});
		throw new Error('Error generating token');
	}
};

/**
 * Generates a refresh token for a user.
 * @function
 * @param {Object} user - The user object containing `id`.
 * @param {string} user.id - The ID of the user.
 * @returns {string} - The generated refresh token.
 * @throws {Error} - Throws an error if refresh token generation fails.
 */
const generateRefreshToken = (user) => {
	try {
		const refreshToken = sign(
			{ id: user.id },
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: '7d',
			}
		);
		info('Refresh token generated successfully', {
			context: { userId: user.id },
		});
		return refreshToken;
	} catch (error) {
		_error('Error generating refresh token', {
			message: error.message,
			stack: error.stack,
			context: { userId: user.id },
		});
		throw new Error('Error generating refresh token');
	}
};

/**
 * Verifies a JWT token.
 * @function
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded token payload.
 * @throws {Error} - Throws an error if token verification fails.
 */
const verifyToken = (token) => {
	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		info('Token verified successfully', { decoded });
		return decoded;
	} catch (err) {
		_error('Token verification error', {
			message: err.message,
			stack: err.stack,
		});
		throw new Error('Invalid token');
	}
};

/**
 * Verifies a refresh token.
 * @function
 * @param {string} token - The refresh token to verify.
 * @returns {Object} - The decoded token payload.
 * @throws {Error} - Throws an error if refresh token verification fails.
 */
const verifyRefreshToken = (token) => {
	try {
		const decoded = verify(token, process.env.JWT_REFRESH_SECRET);
		info('Refresh token verified successfully', { decoded });
		return decoded;
	} catch (err) {
		_error('Refresh token verification error', {
			message: err.message,
			stack: err.stack,
		});
		throw new Error('Invalid refresh token');
	}
};

/**
 * Retrieves a user based on the token.
 * @param {string} token - The token to extract the user ID from.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
const getUserByToken = async (token) => {
    try {
      const decoded = verifyToken(token); // Assuming verifyToken decodes the token
      const user = await User.findByPk(decoded.id);
      return user;
    } catch (error) {
      _error('Error retrieving user by token', {
        message: error.message,
        stack: error.stack,
      });
      return null;
    }
};

export default {
	hashPassword,
	comparePassword,
	generateToken,
	generateRefreshToken,
	verifyToken,
	verifyRefreshToken,
    getUserByToken
};
