/**
 * @module authMiddleware
 */

import authService from '../services/authService.js'; // Import the default export
const { verifyToken, getUserByToken } = authService; // Destructure functions
import { info, warn, error as _error } from '../utils/logger.js'; // Import the logger

/**
 * Middleware to authenticate users based on JWT in the request headers.
 * @function
 * @name authenticate
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authenticate = async (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		warn('No token provided in request headers', { headers: req.headers });
		return res.status(403).json({ message: 'No token provided' });
	}

	try {
		const decoded = verifyToken(token);
		req.user = await getUserByToken(decoded.id);

		if (!req.user) {
			warn('User not found after token verification', {
				userId: decoded.id,
			});
			return res.status(401).json({ message: 'User not found' });
		}

		info('User successfully authenticated', { userId: req.user.id });
		next();
	} catch (err) {
		_error('Authentication middleware error', {
			message: err.message,
			stack: err.stack,
		});
		res.status(401).json({ message: 'Unauthorized' });
	}
};

/**
 * Middleware to authorize users based on their roles.
 * @function
 * @name authorize
 * @param {Array<string>} roles - Array of roles allowed to access the route.
 * @returns {Function} Middleware function.
 */
const authorize = (roles) => (req, res, next) => {
	if (!req.user) {
		warn('User is not authenticated', { userId: req.user?.id });
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (roles.includes(req.user.role)) {
		info('User successfully authorized', { userId: req.user.id });
		next();
	} else {
		warn('User does not have the required role', {
			userId: req.user.id,
			requiredRoles: roles,
		});
		res.status(403).json({ message: 'Forbidden' });
	}
};

export default { authenticate, authorize };
