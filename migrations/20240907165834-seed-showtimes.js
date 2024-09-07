'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Showtimes', [
      {
        //showtime_id: 1, // Ensure this is valid
        start_time: new Date('2024-09-10T14:00:00Z'),
        movie_id: 1, // Add appropriate movie_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //showtime_id: 1, // Ensure this is valid
        start_time: new Date('2024-09-10T16:00:00Z'),
        movie_id: 1, // Add appropriate movie_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Showtimes', null, {});
  },
};
