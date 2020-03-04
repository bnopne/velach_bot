module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('User', 'stravaLink', { type: Sequelize.TEXT });
  },

  down: () => {
    throw new Error('No rollback allowed, use pre-migration dump');
  },
};
