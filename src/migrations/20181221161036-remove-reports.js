module.exports = {
  up: queryInterface => queryInterface.dropTable('BikecheckReport'),

  down: () => {
    throw new Error('No rollback allowed, use pre-migration dump');
  },
};
