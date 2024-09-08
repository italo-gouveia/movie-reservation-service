'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Reservations', 'seat_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Seats', // Ensure the model name matches the actual table name
			key: 'id',
		},
		onDelete: 'CASCADE',
	});
}
export async function down(queryInterface) {
	await queryInterface.removeColumn('Reservations', 'seat_id');
}
