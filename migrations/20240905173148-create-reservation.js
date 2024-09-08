'use strict';

/**
 * Migration for creating the Reservations table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Reservations', {
		/**
		 * Unique identifier for the reservation.
		 * @type {Sequelize.INTEGER}
		 */
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		/**
		 * Time when the reservation was made. Defaults to the current time.
		 * @type {Sequelize.DATE}
		 */
		reservation_time: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
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
 * Reverts the creation of the Reservations table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.dropTable('Reservations');
}
