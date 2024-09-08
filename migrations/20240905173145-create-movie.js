// migrations/XXXXXX-create-movie.js
'use strict';

/** @type {import('sequelize').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Movies', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		poster_url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		genre: {
			type: Sequelize.STRING,
			allowNull: false,
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
	await queryInterface.dropTable('Movies');
}
