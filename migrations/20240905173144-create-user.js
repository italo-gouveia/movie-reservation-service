// migrations/XXXXXX-create-user.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		role: {
			type: Sequelize.ENUM('admin', 'user'),
			allowNull: false,
			defaultValue: 'user',
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	});
}
export async function down(queryInterface) {
	await queryInterface.dropTable('Users');
}
