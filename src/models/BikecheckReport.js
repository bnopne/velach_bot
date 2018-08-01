module.exports = (sequelize, DataTypes) => sequelize.define(
  'BikecheckReport',
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
  },
  {
    timestamps: true,
    associate: (BikecheckReport, models) => {
      BikecheckReport.belongsTo(models.User, { as: 'user' });
      BikecheckReport.belongsTo(models.Bikecheck, { as: 'bikecheck' });
    },
  },
);
