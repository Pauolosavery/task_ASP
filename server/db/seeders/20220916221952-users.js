module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      positionId: 1,
      fullname: 'Pavel Plekhanov',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      positionId: 2,
      fullname: 'Pavel',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      positionId: 3,
      fullname: 'Plekhanov',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
