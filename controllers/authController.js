import {
	createUser,
	findUserByUsername,
	comparePassword,
	generateToken,
} from '../services/userService';
import logger from '../utils/logger';

const signUp = async (req, res) => {
	try {
		const { username, password, role } = req.body;
		if (!username || !password) {
			logger.warn('Sign-up attempt with missing fields', {
				body: req.body,
			});
			return res
				.status(400)
				.json({ message: 'Username and password are required' });
		}

		const user = await createUser(username, password, role);
		res.status(201).json({ id: user.id, username: user.username });
	} catch (err) {
		logger.error('Error in sign-up:', err.message, { stack: err.stack });
		res.status(500).json({ message: 'Error creating user' });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			logger.warn('Login attempt with missing fields', {
				body: req.body,
			});
			return res
				.status(400)
				.json({ message: 'Username and password are required' });
		}

		const user = await findUserByUsername(username);
		if (!user || !comparePassword(password, user.password)) {
			logger.warn('Invalid login attempt', { username });
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user);
		res.json({ token });
	} catch (err) {
		logger.error('Error in login:', err.message, { stack: err.stack });
		res.status(500).json({ message: 'Error logging in' });
	}
};

export default { signUp, login };
