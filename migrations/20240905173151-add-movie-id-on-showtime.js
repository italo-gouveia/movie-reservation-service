// migrations/XXXXXX-add-movie-id-to-showtimes.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Showtimes', 'movie_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Movies', // Ensure this matches the table name
			key: 'id',
		},
		onDelete: 'CASCADE',
	});
}
export async function down(queryInterface) {
	await queryInterface.removeColumn('Showtimes', 'movie_id');
}
