'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Seats', [
      {
        showtime_id: 1, // Ensure this is valid
        seat_number: 'A1',
        is_reserved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 1, // Ensure this is valid
        seat_number: 'A2',
        is_reserved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 1, // Ensure this is valid
        seat_number: 'B1',
        is_reserved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  },
};
