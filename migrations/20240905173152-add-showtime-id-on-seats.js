'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Seats', 'showtime_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Showtimes',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Seats', 'showtime_id');
  },
};
