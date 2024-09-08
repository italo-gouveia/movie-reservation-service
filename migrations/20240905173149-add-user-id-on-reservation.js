'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Reservations', 'user_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Users',
			key: 'id',
		},
		onDelete: 'CASCADE',
	});
}
export async function down(queryInterface) {
	await queryInterface.removeColumn('Reservations', 'user_id');
}
