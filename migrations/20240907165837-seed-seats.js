'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Seats',
		[
			{
				showtime_id: 1, // Ensure this is valid
				seat_number: 'A1',
				is_reserved: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				showtime_id: 1, // Ensure this is valid
				seat_number: 'A2',
				is_reserved: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				showtime_id: 1, // Ensure this is valid
				seat_number: 'B1',
				is_reserved: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Seats', null, {});
}
