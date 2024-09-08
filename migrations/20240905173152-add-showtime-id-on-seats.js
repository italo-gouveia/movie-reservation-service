'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Seats', 'showtime_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Showtimes',
			key: 'id',
		},
	});
}
export async function down(queryInterface) {
	await queryInterface.removeColumn('Seats', 'showtime_id');
}
