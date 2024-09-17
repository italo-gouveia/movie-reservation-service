'use strict';

/**
 * Migration for creating the Users table.
 *
 * @type {import('sequelize').Migration}
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
		/**
		 * Unique identifier for the user.
		 * @type {Sequelize.INTEGER}
		 */
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		/**
		 * Username of the user. Must be unique and cannot be null.
		 * @type {Sequelize.STRING}
		 */
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		/**
		 * Password of the user. Cannot be null.
		 * @type {Sequelize.STRING}
		 */
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		/**
		 * Role of the user. Can be either 'admin' or 'user'. Defaults to 'user'.
		 * @type {Sequelize.ENUM}
		 */
		role: {
			type: Sequelize.ENUM('admin', 'user'),
			allowNull: false,
			defaultValue: 'user',
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
 * Reverts the creation of the Users table.
 *
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function down(queryInterface) {
	await queryInterface.dropTable('Users');
}
