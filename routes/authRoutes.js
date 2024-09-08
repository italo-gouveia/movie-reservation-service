import { Router } from 'express';
import { signUp, login, refreshToken } from '../controllers/authController.js';

const router = Router();

/**
 * @route POST /signup
 * @desc Register a new user
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The created user object
 */
router.post('/signup', signUp);

/**
 * @route POST /login
 * @desc Log in a user and return a JWT token
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The JWT token and user information
 */
router.post('/login', login);

/**
 * @route POST /refresh-token
 * @desc Refresh a JWT token using a refresh token
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The new JWT token
 */
router.post('/refresh-token', refreshToken);

export default router;
