'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2a$10$fEwDPpTyIz/Zo9QKwMCTQuyPaxbOrXCuDytcOZq0dkelj907glbkS', // hashed 'admin_password'
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user',
        password: '$2a$10$JXEMkbVjoh8dLeGJV2q6jO.2bEGE/kyVpK8eEQvbtNgEbolCD7Jau', // hashed 'user_password'
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
