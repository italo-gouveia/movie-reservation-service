const sequelize = require('./config');
const User = require('./models/user');
const Movie = require('./models/movie');
const Showtime = require('./models/showtime');
const Seat = require('./models/seat');
const Reservation = require('./models/reservation');

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Use `force: true` to drop and recreate tables
    console.log('Database synchronized');

    // Create an initial admin user
    /*await User.create({
      username: 'admin',
      password: 'adminpassword', // In a real application, use hashed passwords
      role: 'admin',
    });*/

    console.log('Initial admin user created');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
