module.exports = (sequelize, DataTypes) => sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    isBot: {
      type: DataTypes.BOOLEAN,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    associate: () => {},
  },
);
