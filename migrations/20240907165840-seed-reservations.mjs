'use strict';

/**
 * Seed the `Reservations` table with initial data.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Reservations',
		[
			{
				user_id: 2, // Replace with actual user_id from the seed data
				showtime_id: 1, // Replace with actual showtime_id from the seed data
				seat_id: 3, // Replace with actual seat_id from the seed data
				reservation_time: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}

/**
 * Revert the seeding of `Reservations` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Reservations', null, {});
}
