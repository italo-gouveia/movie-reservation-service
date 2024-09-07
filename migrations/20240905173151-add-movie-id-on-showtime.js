// migrations/XXXXXX-add-movie-id-to-showtimes.js
'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Showtimes', 'movie_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Movies', // Ensure this matches the table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Showtimes', 'movie_id');
  },
};
