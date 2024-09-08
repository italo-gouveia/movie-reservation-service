/**
 * @module authUtils
 */

import { hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import process from 'process';
import { info, warn, error as _error } from '../logger';

/**
 * Hashes a password using bcrypt.
 * @function
 * @name hashPassword
 * @param {string} password - The plain text password to hash.
 * @returns {string} - The hashed password.
 */
const hashPassword = (password) => {
	try {
		return hashSync(password, 10);
	} catch (error) {
		_error('Error hashing password', {
			message: error.message,
			stack: error.stack,
		});
		throw new Error('Error hashing password');
	}
};

/**
 * Compares a plain text password with a hashed password.
 * @function
 * @name comparePassword
 * @param {string} plainPassword - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
const comparePassword = (password, hashedPassword) => {
	try {
		return compareSync(password, hashedPassword);
	} catch (error) {
		_error('Error comparing passwords', {
			message: error.message,
			stack: error.stack,
		});
		throw new Error('Error comparing passwords');
	}
};

/**
 * Generates a JWT token.
 * @function
 * @name generateToken
 * @param {Object} user - The user object to include in the token payload.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
	try {
		return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
			expiresIn: '2h',
		});
	} catch (error) {
		_error('Error generating token', {
			message: error.message,
			stack: error.stack,
		});
		throw new Error('Error generating token');
	}
};

/**
 * Generates a refresh token.
 * @function
 * @name generateRefreshToken
 * @param {Object} user - The user object to include in the refresh token payload.
 * @returns {string} - The generated refresh token.
 */
const generateRefreshToken = (user) => {
	try {
		return sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '7d',
		});
	} catch (error) {
		_error('Error generating refresh token', {
			message: error.message,
			stack: error.stack,
		});
		throw new Error('Error generating refresh token');
	}
};

/**
 * Verifies a JWT token.
 * @function
 * @name verifyToken
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded token payload.
 */
const verifyToken = (token) => {
	try {
		return verify(token, process.env.JWT_SECRET);
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
 * @name verifyRefreshToken
 * @param {string} refreshToken - The refresh token to verify.
 * @returns {Object} - The decoded refresh token payload.
 */
const verifyRefreshToken = (token) => {
	try {
		return verify(token, process.env.JWT_REFRESH_SECRET);
	} catch (err) {
		_error('Refresh token verification error', {
			message: err.message,
			stack: err.stack,
		});
		throw new Error('Invalid refresh token');
	}
};

export default {
	hashPassword,
	comparePassword,
	generateToken,
	generateRefreshToken,
	verifyToken,
	verifyRefreshToken,
};
