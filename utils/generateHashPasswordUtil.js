const bcrypt = require('bcryptjs');

const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);
};

console.log(generateHash('admin_password')); // For admin user
console.log(generateHash('user_password'));  // For regular user
