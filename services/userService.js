import { User } from '../models';
import authUtils from '../utils/authUtils';
const { hashPassword, generateToken } = authUtils;
import { info, warn, error as _error } from '../logger'; // Import the logger

const createUser = async (username, password, role) => {
    try {
        const hashedPassword = hashPassword(password);
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
        });
        throw new Error('Error creating user'); // Ensure this is handled by the middleware
    }
};

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
        });
        throw new Error('Error finding user'); // Ensure this is handled by the middleware
    }
};

export default { createUser, findUserByUsername, generateToken };
