// migrations/XXXXXX-create-seat.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Seats', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		seat_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		is_reserved: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
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
	await queryInterface.dropTable('Seats');
}
