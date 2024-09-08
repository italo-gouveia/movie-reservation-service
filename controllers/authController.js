import {
    createUser,
    findUserByUsername,
    comparePassword,
    generateToken,
} from '../services/userService';
import logger from '../utils/logger';

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

        const user = await createUser(username, password, role);
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
        next(err); // Pass the error to the centralized error handler
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

        const user = await findUserByUsername(username);
        if (!user || !comparePassword(password, user.password)) {
            logger.warn('Invalid login attempt', {
                context: {
                    username,
                    ip: req.ip,
                    userAgent: req.headers['user-agent']
                }
            });
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user);
        res.status(200).json({ token });
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
        next(err); // Pass the error to the centralized error handler
    }
};

export default { signUp, login };
