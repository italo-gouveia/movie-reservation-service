// migrations/XXXXXX-create-reservation.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Reservations', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		reservation_time: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	});
}
export async function down(queryInterface) {
	await queryInterface.dropTable('Reservations');
}
