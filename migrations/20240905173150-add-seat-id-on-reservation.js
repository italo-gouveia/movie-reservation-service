'use strict';

/**
 * Migration to add `seat_id` column to the `Reservations` table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Reservations', 'seat_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Seats', // Ensure this matches the table name
			key: 'id',
		},
		onDelete: 'CASCADE', // Automatically delete reservations if the seat is deleted
	});
}

/**
 * Reverts the addition of the `seat_id` column from the `Reservations` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.removeColumn('Reservations', 'seat_id');
}
