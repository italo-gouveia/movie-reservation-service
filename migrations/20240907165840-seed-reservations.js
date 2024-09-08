'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Reservations',
		[
			{
				user_id: 2, // Replace with actual user ID from the seed data
				showtime_id: 1, // Replace with actual showtime ID from the seed data
				seat_id: 3, // Replace with actual seat ID from the seed data
				reservation_time: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Reservations', null, {});
}
