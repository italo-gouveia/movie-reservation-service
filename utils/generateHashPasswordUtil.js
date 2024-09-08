import { genSaltSync, hashSync } from 'bcryptjs';
import { info, warn, error as _error } from '../logger'; // Import the logger

/**
 * Generates a hashed password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {string} - The hashed password.
 *
 * @throws {Error} - Throws an error if hashing fails.
 */
const generateHash = (password) => {
	try {
		const salt = genSaltSync(10);
		const hash = hashSync(password, salt);
		return hash;
	} catch (error) {
		_error('Error generating hash', {
			message: error.message,
			stack: error.stack,
			context: { password },
		});
		throw new Error('Failed to generate hash');
	}
};

// Generate hashes for different users and log them
const adminPasswordHash = generateHash('admin_password');
const userPasswordHash = generateHash('user_password');

info('Admin Password Hash:', { hash: adminPasswordHash });
info('User Password Hash:', { hash: userPasswordHash });
