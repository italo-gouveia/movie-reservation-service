'use strict';

/**
 * Seed the `Showtimes` table with initial data.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Showtimes',
		[
			{
				start_time: new Date('2024-09-10T14:00:00Z'),
				movie_id: 1, // Ensure this is a valid movie_id from the seed data
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				start_time: new Date('2024-09-10T16:00:00Z'),
				movie_id: 1, // Ensure this is a valid movie_id from the seed data
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}

/**
 * Revert the seeding of `Showtimes` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Showtimes', null, {});
}
