module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Positions', [{
      jobTitle: 'fullstack',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      jobTitle: 'frontend',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      jobTitle: 'backend',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Positions', null, {});
  },
};
