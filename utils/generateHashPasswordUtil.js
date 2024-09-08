import { genSaltSync, hashSync } from 'bcryptjs';

const generateHash = (password) => {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);
	console.log(hash);
};

console.log(generateHash('admin_password')); // For admin user
console.log(generateHash('user_password')); // For regular user
