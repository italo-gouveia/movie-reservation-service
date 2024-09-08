'use strict';

/**
 * Migration to add `showtime_id` column to the `Reservations` table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Reservations', 'showtime_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Showtimes', // Ensure this matches the table name
			key: 'id',
		},
		onDelete: 'CASCADE', // Automatically delete reservations if the showtime is deleted
	});
}

/**
 * Reverts the addition of the `showtime_id` column from the `Reservations` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.removeColumn('Reservations', 'showtime_id');
}
