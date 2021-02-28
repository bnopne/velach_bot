const { Op } = require('sequelize');

const Entity = require('./Entity');
const models = require('../models');
const BikecheckVote = require('./BikecheckVote');
const BikecheckChatMtm = require('./BikecheckChatMtm');

class Bikecheck extends Entity {
  constructor(model) {
    super(model);

    this.lastRankQueryTime = null;
    this.cachedRank = null;
  }

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
    const bikechecks = await this.modelClass.findAll({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    return bikechecks.map((b) => new this(b));
  }

  static async findActiveForChat(user, chat) {
    const bikechecks = (await this.modelClass.findAll({
      where: {
        userId: user.id,
        isActive: true,
      },
    })).map((b) => new this(b));

    const notBannedBikechecks = (await Promise.all(bikechecks.map((b) => b.isBannedInChat(chat))))
      .map((isBanned, i) => !isBanned && bikechecks[i])
      .filter((bikecheck) => Boolean(bikecheck));

    return notBannedBikechecks;
  }

  static async createActiveForUser(user, telegramImageId) {
    const model = await this.create({
      userId: user.id,
      telegramImageId,
      isActive: true,
    });

    return new this(model);
  }

  static async getTop(topCount = 1) {
    const [rows] = await models.sequelize.query(`
      select id, count("bikecheckId")
      from
        (
          select * from "Bikecheck" b where b."isActive" = true
        ) as T1
        inner join
        (
          select "bikecheckId" from "BikecheckVote" bv where bv.points  > 0
        ) as T2
        on T1.id = T2."bikecheckId"
      group by T1.id
      order by "count" desc
      limit ${topCount}
    `);

    const bikechecks = await this.modelClass.findAll({
      where: {
        id: {
          [Op.in]: rows.map((r) => r.id),
        },
      },
    });

    return bikechecks.map((b) => new this(b));
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

    const likes = votes
      .filter((vote) => vote.isLike)
      .length;

    const dislikes = votes
      .filter((vote) => vote.isDislike)
      .length;

    return { likes, dislikes };
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

  async getRank() {
    if (this.lastRankQueryTime && new Date() - this.lastRankQueryTime < 10000) {
      return this.cachedRank;
    }

    const [rows] = await models.sequelize.query(`
      select "rank"
      from (
        select id, "likes", row_number () over (order by "likes" desc) as "rank"
        from (
          select id, count("likes") as "likes"
          from
          (
            select id from "Bikecheck" b where b."isActive" = true
          ) as T1
          inner join
          (
            select "bikecheckId" as "likes" from "BikecheckVote" bv where bv.points  > 0
          ) as T2
          on T1.id = T2."likes"
          group by T1.id
        ) T
      ) T
      where T.id = ${this.id}
    `);

    this.lastRankQueryTime = new Date();
    this.cachedRank = rows.length ? rows[0].rank : -1;

    return this.cachedRank;
  }
}

module.exports = Bikecheck;
