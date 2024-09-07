'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservations', 'seat_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Seats', // Ensure the model name matches the actual table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Reservations', 'seat_id');
  },
};
