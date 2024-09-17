'use strict';

/**
 * Migration for creating the Seats table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Seats', {
		/**
		 * Unique identifier for the seat.
		 * @type {Sequelize.INTEGER}
		 */
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		/**
		 * Seat number. Cannot be null.
		 * @type {Sequelize.STRING}
		 */
		seat_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		/**
		 * Indicates whether the seat is reserved. Defaults to false.
		 * @type {Sequelize.BOOLEAN}
		 */
		is_reserved: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
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
 * Reverts the creation of the Seats table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.dropTable('Seats');
}
