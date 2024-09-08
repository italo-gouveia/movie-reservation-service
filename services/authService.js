import { verify } from 'jsonwebtoken';
import { User } from '../models';
import { info, warn, error as _error } from '../logger'; // Import the logger
import process from 'process';

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
        throw new Error('Invalid token'); // Ensure this is handled by the middleware
    }
};

const getUserByToken = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            warn('User not found', { id });
            throw new Error('User not found'); // Ensure this is handled by the middleware
        }
        info('User retrieved successfully', { id, username: user.username });
        return user;
    } catch (err) {
        _error('Error fetching user by token', {
            message: err.message,
            stack: err.stack,
        });
        throw err; // Re-throw the error to be caught by middleware
    }
};

export default {
    verifyToken,
    getUserByToken,
};
