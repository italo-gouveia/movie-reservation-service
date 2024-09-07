const authService = require('../services/authService');
const logger = require('../logger'); // Import the logger

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        logger.warn('No token provided in request headers', { headers: req.headers });
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = authService.verifyToken(token);
        req.user = await authService.getUserByToken(decoded.id);
        if (!req.user) {
            logger.warn('User not found after token verification', { userId: decoded.id });
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (err) {
        logger.error('Authentication middleware error', { message: err.message, stack: err.stack });
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const authorize = (roles) => (req, res, next) => {
    if (!req.user) {
        logger.warn('User is not authenticated', { userId: req.user?.id });
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.includes(req.user.role)) {
        next();
    } else {
        logger.warn('User does not have the required role', { userId: req.user.id, requiredRoles: roles });
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = { authenticate, authorize };
