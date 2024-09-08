'use strict';

/**
 * Seed the `Movies` table with initial data.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Movies',
		[
			{
				title: 'Inception',
				description:
					'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
				poster_url: 'https://example.com/inception.jpg',
				genre: 'Sci-Fi',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'The Matrix',
				description:
					'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
				poster_url: 'https://example.com/matrix.jpg',
				genre: 'Action',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}

/**
 * Revert the seeding of `Movies` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Movies', null, {});
}
