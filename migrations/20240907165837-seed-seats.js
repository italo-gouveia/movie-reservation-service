'use strict';

/**
 * Seed the `Seats` table with initial data.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Seats',
		[
			{
				showtime_id: 1, // Ensure this is a valid showtime_id from the seed data
				seat_number: 'A1',
				is_reserved: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				showtime_id: 1, // Ensure this is a valid showtime_id from the seed data
				seat_number: 'A2',
				is_reserved: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				showtime_id: 1, // Ensure this is a valid showtime_id from the seed data
				seat_number: 'B1',
				is_reserved: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}

/**
 * Revert the seeding of `Seats` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Seats', null, {});
}
