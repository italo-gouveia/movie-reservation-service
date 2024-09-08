import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import process from 'process';

const hashPassword = (password) => {
	return hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
	return compareSync(password, hashedPassword);
};

const generateToken = (user) => {
	return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: '2h',
	});
};

export default { hashPassword, comparePassword, generateToken };
