'use strict';

/**
 * Seed the `Users` table with initial data.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface) {
	await queryInterface.bulkInsert(
		'Users',
		[
			{
				username: 'admin',
				password:
					'$2a$10$fEwDPpTyIz/Zo9QKwMCTQuyPaxbOrXCuDytcOZq0dkelj907glbkS', // hashed 'admin_password'
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'user',
				password:
					'$2a$10$JXEMkbVjoh8dLeGJV2q6jO.2bEGE/kyVpK8eEQvbtNgEbolCD7Jau', // hashed 'user_password'
				role: 'user',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
}

/**
 * Revert the seeding of `Users` table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Users', null, {});
}
