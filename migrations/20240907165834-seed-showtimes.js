'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Showtimes',
		[
			{
				start_time: new Date('2024-09-10T14:00:00Z'),
				movie_id: 1, // Add appropriate movie_id
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				start_time: new Date('2024-09-10T16:00:00Z'),
				movie_id: 1, // Add appropriate movie_id
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Showtimes', null, {});
}
