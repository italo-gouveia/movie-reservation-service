// migrations/XXXXXX-create-showtime.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Showtimes', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		start_time: {
			type: Sequelize.DATE,
			allowNull: false,
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
	await queryInterface.dropTable('Showtimes');
}
