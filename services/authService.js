const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../logger'); // Import the logger

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        logger.error('Token verification error', { message: err.message, stack: err.stack });
        throw new Error('Invalid token');
    }
};

const getUserByToken = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            logger.warn('User not found', { id });
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        logger.error('Error fetching user by token', { message: err.message, stack: err.stack });
        throw err;
    }
};

module.exports = {
    verifyToken,
    getUserByToken
};
