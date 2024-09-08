'use strict';

/**
 * Migration to add `user_id` column to the `Reservations` table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Reservations', 'user_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Users', // Ensure this matches the table name
			key: 'id',
		},
		onDelete: 'CASCADE', // Automatically delete reservations if the user is deleted
	});
}

/**
 * Reverts the addition of the `user_id` column from the `Reservations` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.removeColumn('Reservations', 'user_id');
}
