const { User } = require('../models');
const { hashPassword, generateToken } = require('../utils/authUtils');
const logger = require('../utils/logger');

const createUser = async (username, password, role) => {
    try {
        const hashedPassword = hashPassword(password);
        const user = await User.create({ username, password: hashedPassword, role });
        logger.info(`User created: ${JSON.stringify({ id: user.id, username: user.username })}`);
        return user;
    } catch (error) {
        logger.error('Error creating user:', error.message, { stack: error.stack });
        throw new Error('Error creating user');
    }
};

const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            logger.info(`User found: ${JSON.stringify({ id: user.id, username: user.username })}`);
        } else {
            logger.warn(`User not found: ${username}`);
        }
        return user;
    } catch (error) {
        logger.error('Error finding user:', error.message, { stack: error.stack });
        throw new Error('Error finding user');
    }
};

module.exports = { createUser, findUserByUsername, generateToken };
