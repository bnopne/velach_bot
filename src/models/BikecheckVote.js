module.exports = (sequelize, DataTypes) => sequelize.define(
  'BikecheckVote',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bikecheckId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    associate: (BikecheckVote, models) => {
      BikecheckVote.belongsTo(models.User, { as: 'user' });
      BikecheckVote.belongsTo(models.Bikecheck, { as: 'bikecheck' });
    },
  },
);
