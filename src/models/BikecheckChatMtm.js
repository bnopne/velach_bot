module.exports = (sequelize, DataTypes) => sequelize.define(
  'BikecheckChatMtm',
  {
    bikecheckId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    associate: (BikecheckChatMtm, models) => {
      BikecheckChatMtm.belongsTo(models.Bikecheck, { as: 'bikecheck' });
      BikecheckChatMtm.belongsTo(models.Chat, { as: 'chat' });
    },
  },
);
