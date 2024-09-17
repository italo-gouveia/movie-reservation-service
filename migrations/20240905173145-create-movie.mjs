'use strict';

/**
 * Migration for creating the Movies table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Movies', {
		/**
		 * Unique identifier for the movie.
		 * @type {Sequelize.INTEGER}
		 */
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		/**
		 * Title of the movie. Cannot be null.
		 * @type {Sequelize.STRING}
		 */
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		/**
		 * Description of the movie. Cannot be null.
		 * @type {Sequelize.TEXT}
		 */
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		/**
		 * URL of the movie poster. Cannot be null.
		 * @type {Sequelize.STRING}
		 */
		poster_url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		/**
		 * Genre of the movie. Cannot be null.
		 * @type {Sequelize.STRING}
		 */
		genre: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		/**
		 * Timestamp when the record was created.
		 * @type {Sequelize.DATE}
		 */
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		/**
		 * Timestamp when the record was last updated.
		 * @type {Sequelize.DATE}
		 */
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	});
}

/**
 * Reverts the creation of the Movies table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.dropTable('Movies');
}
