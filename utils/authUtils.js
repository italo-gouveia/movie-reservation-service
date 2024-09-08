import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import process from 'process';
import { info, warn, error as _error } from '../logger'; // Import the logger

const hashPassword = (password) => {
    try {
        const hashedPassword = hashSync(password, 10);
        info('Password hashed successfully', { context: { hashedPassword } });
        return hashedPassword;
    } catch (error) {
        _error('Error hashing password', {
            message: error.message,
            stack: error.stack,
            context: { password }, // Log password (or its length) if necessary for debugging
        });
        throw new Error('Error hashing password');
    }
};

const comparePassword = (password, hashedPassword) => {
    try {
        const isMatch = compareSync(password, hashedPassword);
        info('Password comparison result', { context: { isMatch } });
        return isMatch;
    } catch (error) {
        _error('Error comparing passwords', {
            message: error.message,
            stack: error.stack,
            context: { password }, // Log password (or its length) if necessary for debugging
        });
        throw new Error('Error comparing passwords');
    }
};

const generateToken = (user) => {
    try {
        const token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
        info('Token generated successfully', { context: { userId: user.id } });
        return token;
    } catch (error) {
        _error('Error generating token', {
            message: error.message,
            stack: error.stack,
            context: { userId: user.id }, // Log user ID (but not the token itself) for debugging
        });
        throw new Error('Error generating token');
    }
};

export default { hashPassword, comparePassword, generateToken };
