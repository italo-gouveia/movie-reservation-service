import authUtils from '../utils/authUtils';
import userService from '../services/userService';
import { info, warn, error as _error } from '../logger'; // Import the logger

const signUp = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            logger.warn('Sign-up attempt with missing fields', {
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
        logger.error('Error in sign-up:', {
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
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warn('Login attempt with missing fields', {
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
            logger.warn('Invalid login attempt', {
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
        logger.error('Error in login:', {
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
};

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
        logger.error('Error refreshing token', {
            message: error.message,
            stack: error.stack,
            context: { refreshToken }
        });
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export default { signUp, login, refreshToken };
