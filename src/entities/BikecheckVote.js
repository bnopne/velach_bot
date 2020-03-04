const Entity = require('./Entity');
const models = require('../models');
const constants = require('./constants');

class BikecheckVote extends Entity {
  static get modelClass() {
    return models.BikecheckVote;
  }

  static async getAllForBikecheck(bikecheck) {
    const voteModels = await this.modelClass.findAll({
      where: {
        bikecheckId: bikecheck.id,
      },
    });

    return voteModels.map(voteModel => new BikecheckVote(voteModel)); // eslint-disable-line
  }

  static async getForBikecheckByUser(bikecheck, user) {
    const voteModel = await this.modelClass.findOne({
      where: {
        bikecheckId: bikecheck.id,
        userId: user.id,
      },
    });

    return voteModel ? new BikecheckVote(voteModel) : null;
  }

  static createUpVote(bikecheck, user) {
    return this.create({
      userId: user.id,
      bikecheckId: bikecheck.id,
      points: constants.UPVOTE_POINTS,
    });
  }

  static createDownVote(bikecheck, user) {
    return this.create({
      userId: user.id,
      bikecheckId: bikecheck.id,
      points: constants.DOWNVOTE_POINTS,
    });
  }

  get points() {
    return this.model.points;
  }

  get isLike() {
    return this.points === constants.UPVOTE_POINTS;
  }

  get isDislike() {
    return this.points === constants.DOWNVOTE_POINTS;
  }

  toggleUp() {
    this.model.points = constants.UPVOTE_POINTS;
    return this.model.save();
  }

  toggleDown() {
    this.model.points = constants.DOWNVOTE_POINTS;
    return this.model.save();
  }
}

module.exports = BikecheckVote;
