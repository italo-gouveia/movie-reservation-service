import { hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import process from 'process';
import { info, warn, error as _error } from '../logger';

const hashPassword = (password) => {
    try {
        return hashSync(password, 10);
    } catch (error) {
        _error('Error hashing password', { message: error.message, stack: error.stack });
        throw new Error('Error hashing password');
    }
};

const comparePassword = (password, hashedPassword) => {
    try {
        return compareSync(password, hashedPassword);
    } catch (error) {
        _error('Error comparing passwords', { message: error.message, stack: error.stack });
        throw new Error('Error comparing passwords');
    }
};

const generateToken = (user) => {
    try {
        return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    } catch (error) {
        _error('Error generating token', { message: error.message, stack: error.stack });
        throw new Error('Error generating token');
    }
};

const generateRefreshToken = (user) => {
    try {
        return sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    } catch (error) {
        _error('Error generating refresh token', { message: error.message, stack: error.stack });
        throw new Error('Error generating refresh token');
    }
};

const verifyToken = (token) => {
    try {
        return verify(token, process.env.JWT_SECRET);
    } catch (err) {
        _error('Token verification error', { message: err.message, stack: err.stack });
        throw new Error('Invalid token');
    }
};

const verifyRefreshToken = (token) => {
    try {
        return verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        _error('Refresh token verification error', { message: err.message, stack: err.stack });
        throw new Error('Invalid refresh token');
    }
};

export default { hashPassword, comparePassword, generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
