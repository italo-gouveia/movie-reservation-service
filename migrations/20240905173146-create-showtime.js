'use strict';

/**
 * Migration for creating the Showtimes table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Showtimes', {
		/**
		 * Unique identifier for the showtime.
		 * @type {Sequelize.INTEGER}
		 */
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		/**
		 * Start time of the showtime. Cannot be null.
		 * @type {Sequelize.DATE}
		 */
		start_time: {
			type: Sequelize.DATE,
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
 * Reverts the creation of the Showtimes table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.dropTable('Showtimes');
}
