import { genSaltSync, hashSync } from 'bcryptjs';
import { info, warn, error as _error } from '../logger'; // Import the logger

const generateHash = (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};

// Generate hashes for different users and log them
const adminPasswordHash = generateHash('admin_password');
const userPasswordHash = generateHash('user_password');

info('Admin Password Hash:', { hash: adminPasswordHash });
info('User Password Hash:', { hash: userPasswordHash });
