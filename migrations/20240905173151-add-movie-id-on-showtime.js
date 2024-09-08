'use strict';

/**
 * Migration to add `movie_id` column to the `Showtimes` table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.addColumn('Showtimes', 'movie_id', {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'Movies', // Ensure this matches the table name
			key: 'id',
		},
		onDelete: 'CASCADE', // Automatically delete showtimes if the movie is deleted
	});
}

/**
 * Reverts the addition of the `movie_id` column from the `Showtimes` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.removeColumn('Showtimes', 'movie_id');
}
