/**
 * @module authController
 */

import authUtils from '../utils/authUtils.js';
import userService from '../services/userService.js';
import { info, warn, error as _error } from '../utils/logger.js';
import { body, validationResult } from 'express-validator';
import xss from 'xss';

/**
 * Sanitizes input using the xss library.
 * @param {string} input - The input string to sanitize.
 * @returns {string} - The sanitized input string.
 */
const sanitizeInput = (input) => xss(input);

/**
 * Handles user sign-up. Validates and sanitizes input, then creates a new user.
 * @function
 * @name signUp
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const signUp = [
	body('username')
		.isAlphanumeric()
		.withMessage('Username must be alphanumeric'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long'),
	body('role').optional().isString().withMessage('Role must be a string'),
	async (req, res, next) => {
		req.body.username = sanitizeInput(req.body.username);
		req.body.password = sanitizeInput(req.body.password);
		req.body.role = sanitizeInput(req.body.role);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { username, password, role } = req.body;

			if (!username || !password) {
				warn('Sign-up attempt with missing fields', {
					context: {
						body: req.body,
						ip: req.ip,
						userAgent: req.headers['user-agent'],
					},
				});
				throw new Error('Username and password are required');
			}

			const user = await userService.createUser(username, password, role);
			res.status(201).json({ id: user.id, username: user.username });
		} catch (err) {
			_error('Error in sign-up', {
				message: err.message,
				stack: err.stack,
				context: {
					body: req.body,
					ip: req.ip,
					userAgent: req.headers['user-agent'],
				},
			});
			next(err);
		}
	},
];

/**
 * Handles user login. Validates and sanitizes input, then generates JWTs.
 * @function
 * @name login
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const login = [
	body('username')
		.isAlphanumeric()
		.withMessage('Username must be alphanumeric'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long'),
	async (req, res, next) => {
		req.body.username = sanitizeInput(req.body.username);
		req.body.password = sanitizeInput(req.body.password);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { username, password } = req.body;

			if (!username || !password) {
				warn('Login attempt with missing fields', {
					context: {
						body: req.body,
						ip: req.ip,
						userAgent: req.headers['user-agent'],
					},
				});
				throw new Error('Username and password are required');
			}

			const user = await userService.findUserByUsername(username);
			if (!user || !authUtils.comparePassword(password, user.password)) {
				warn('Invalid login attempt', {
					context: {
						username,
						ip: req.ip,
						userAgent: req.headers['user-agent'],
					},
				});
				throw new Error('Invalid credentials');
			}

			const token = authUtils.generateToken(user);
			const refreshToken = authUtils.generateRefreshToken(user);

			// Set JWTs as secure cookies
			res.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production', // Only set secure flag in production
				sameSite: 'Strict', // or 'Lax' depending on your needs
				maxAge: 2 * 60 * 60 * 1000, // 2 hours
			});

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'Strict',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});
			res.status(200).json({ token, refreshToken });
		} catch (err) {
			_error('Error in login', {
				message: err.message,
				stack: err.stack,
				context: {
					body: req.body,
					ip: req.ip,
					userAgent: req.headers['user-agent'],
				},
			});
			next(err);
		}
	},
];

/**
 * Handles token refresh. Validates and issues new tokens.
 * @function
 * @name refreshToken
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ message: 'Refresh token is required' });
	}

	try {
		const decoded = authUtils.verifyRefreshToken(refreshToken);
		const user = await userService.findUserByUsername(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		const newToken = authUtils.generateToken(user);
		const newRefreshToken = authUtils.generateRefreshToken(user);

		// Set new JWTs as secure cookies
		res.cookie('token', newToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
			maxAge: 2 * 60 * 60 * 1000, // 2 hours
		});

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		res.status(200).json({
			token: newToken,
			refreshToken: newRefreshToken,
		});
	} catch (error) {
		_error('Error refreshing token', {
			message: error.message,
			stack: error.stack,
			context: { refreshToken },
		});
		res.status(401).json({ message: 'Invalid refresh token' });
	}
};

export { signUp, login, refreshToken };
