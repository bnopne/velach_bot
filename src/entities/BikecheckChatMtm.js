const Entity = require('./Entity');
const models = require('../models');


class BikecheckChatMtm extends Entity {
  static get modelClass() {
    return models.BikecheckChatMtm;
  }

  static async findForBikecheckInChat(bikecheck, chat) {
    const model = await this.modelClass.findOne({
      where: {
        bikecheckId: bikecheck.id,
        chatId: chat.id,
      },
    });

    return model ? new this(model) : null;
  }

  static createForBikecheckInChat(bikecheck, chat) {
    return this.create({
      bikecheckId: bikecheck.id,
      chatId: chat.id,
    });
  }

  get isBanned() {
    return this.model.isBanned;
  }

  ban() {
    this.model.isBanned = true;
    return this.model.save();
  }

  unban() {
    this.model.isBanned = false;
    return this.model.save();
  }
}


module.exports = BikecheckChatMtm;
