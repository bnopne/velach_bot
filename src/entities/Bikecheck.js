const Entity = require('./Entity');
const models = require('../models');
const BikecheckVote = require('./BikecheckVote');
const BikecheckChatMtm = require('./BikecheckChatMtm');
const BikecheckReport = require('./BikecheckReport');


class Bikecheck extends Entity {
  static get modelClass() {
    return models.Bikecheck;
  }

  static async findById(id) {
    const model = await this.modelClass.findOne({
      where: { id },
    });

    return model ? new this(model) : null;
  }

  static async findActiveForUser(user) {
    const model = await this.modelClass.findOne({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    if (!model) {
      return null;
    }

    return new this(model);
  }

  static async createActiveForUser(user, telegramImageId) {
    const model = await this.create({
      userId: user.id,
      telegramImageId,
      isActive: true,
    });

    return new this(model);
  }

  get id() {
    return this.model.id;
  }

  get userId() {
    return this.model.userId;
  }

  get telegramImageId() {
    return this.model.telegramImageId;
  }

  setActive() {
    this.model.isActive = true;
    return this.model.save();
  }

  setInactive() {
    this.model.isActive = false;
    return this.model.save();
  }

  async getScore() {
    const votes = await BikecheckVote.getAllForBikecheck(this);
    const reports = await BikecheckReport.getAllForBikecheck(this);

    const likeCount = votes
      .filter(vote => vote.isLike)
      .length;

    const dislikeCount = votes
      .filter(vote => vote.isDislike)
      .length;

    const reportCount = reports.length;

    return {
      likeCount,
      dislikeCount,
      reportCount,
    };
  }

  async isBannedInChat(chat) {
    const bikecheckChatMtm = await BikecheckChatMtm.findForBikecheckInChat(this, chat);
    return bikecheckChatMtm ? bikecheckChatMtm.isBanned : false;
  }

  async banInChat(chat) {
    let bikecheckChatMtm = await BikecheckChatMtm.findForBikecheckInChat(this, chat);

    if (!bikecheckChatMtm) {
      bikecheckChatMtm = await BikecheckChatMtm.createForBikecheckInChat(this, chat);
    }

    await bikecheckChatMtm.ban();
  }

  async unbanInChat(chat) {
    let bikecheckChatMtm = await BikecheckChatMtm.findForBikecheckInChat(this, chat);

    if (!bikecheckChatMtm) {
      bikecheckChatMtm = await BikecheckChatMtm.createForBikecheckInChat(this, chat);
    }

    await bikecheckChatMtm.unban();
  }
}


module.exports = Bikecheck;
