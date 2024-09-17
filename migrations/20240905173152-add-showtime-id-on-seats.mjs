'use strict';

/**
 * Migration to add `showtime_id` column to the `Seats` table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Seats', 'showtime_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Showtimes', // Ensure this matches the table name
			key: 'id',
		},
	});
}

/**
 * Reverts the addition of the `showtime_id` column from the `Seats` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.removeColumn('Seats', 'showtime_id');
}
