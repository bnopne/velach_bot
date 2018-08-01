module.exports = (sequelize, DataTypes) => sequelize.define(
  'UserChatMtm',
  {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    associate: (UserChatMtm, models) => {
      UserChatMtm.belongsTo(models.User, { as: 'user' });
      UserChatMtm.belongsTo(models.Chat, { as: 'chat' });
    },
  },
);
