import authUtils from '../utils/authUtils';
import userService from '../services/userService';
import { info, warn, error as _error } from '../logger'; // Import the logger
import { body, validationResult } from 'express-validator';
import xss from 'xss';

const sanitizeInput = (input) => xss(input);

const signUp = [
  // Validation and sanitization middleware
  body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('role').optional().isString().withMessage('Role must be a string'),
  async (req, res, next) => {
    // Sanitize inputs
    req.body.username = sanitizeInput(req.body.username);
    req.body.password = sanitizeInput(req.body.password);
    req.body.role = sanitizeInput(req.body.role);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, role } = req.body;

      // Validate fields
      if (!username || !password) {
        warn('Sign-up attempt with missing fields', {
          context: {
            body: req.body,
            ip: req.ip,
            userAgent: req.headers['user-agent']
          }
        });
        throw new Error('Username and password are required');
      }

      const user = await userService.createUser(username, password, role);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      _error('Error in sign-up:', {
        message: err.message,
        stack: err.stack,
        context: {
          body: req.body,
          ip: req.ip,
          userAgent: req.headers['user-agent']
        }
      });
      next(err);
    }
  }
];

const login = [
  // Validation and sanitization middleware
  body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async (req, res, next) => {
    // Sanitize inputs
    req.body.username = sanitizeInput(req.body.username);
    req.body.password = sanitizeInput(req.body.password);

    // Check for validation errors
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
            userAgent: req.headers['user-agent']
          }
        });
        throw new Error('Username and password are required');
      }

      const user = await userService.findUserByUsername(username);
      if (!user || !authUtils.comparePassword(password, user.password)) {
        warn('Invalid login attempt', {
          context: {
            username,
            ip: req.ip,
            userAgent: req.headers['user-agent']
          }
        });
        throw new Error('Invalid credentials');
      }

      const token = authUtils.generateToken(user);
      const refreshToken = authUtils.generateRefreshToken(user);
      res.status(200).json({ token, refreshToken });
    } catch (err) {
      _error('Error in login:', {
        message: err.message,
        stack: err.stack,
        context: {
          body: req.body,
          ip: req.ip,
          userAgent: req.headers['user-agent']
        }
      });
      next(err);
    }
  }
];

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

    res.status(200).json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    _error('Error refreshing token', {
      message: error.message,
      stack: error.stack,
      context: { refreshToken }
    });
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export default { signUp, login, refreshToken };
