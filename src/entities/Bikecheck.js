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

  static async findDeletedForUser(user) {
    const bikechecks = (await this.modelClass.findAll({
      where: {
        userId: user.id,
        isActive: false,
      },
    })).map((b) => new this(b));

    return bikechecks;
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
        left join
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

    return rows.map((row) => new this(bikechecks.find((b) => b.id === row.id)));
  }

  static async findOnSale(position) {
    const bikecheckModels = await this.modelClass.findAll({
      where: {
        isActive: true,
        onSale: true,
      },
      order: [
        ['saleRank', 'DESC'],
      ],
      offset: position - 1,
    });

    if (!bikecheckModels.length) {
      return null;
    }

    return new this(bikecheckModels[0]);
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

  get onSale() {
    return this.model.onSale;
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

  toggleOnSale() {
    this.model.onSale = !this.model.onSale;
    return this.model.save();
  }

  async bumpSaleRank() {
    const [rows] = await this.model.sequelize.query('select max("saleRank") as "maxRank" from "Bikecheck"');

    if (!rows.length) {
      return;
    }

    this.model.saleRank = parseInt(rows[0].maxRank, 10) + 1;
    await this.model.save();
  }

  async sageSaleRank() {
    const [rows] = await this.model.sequelize.query('select min("saleRank") as "maxRank" from "Bikecheck"');

    if (!rows.length) {
      return;
    }

    this.model.saleRank = parseInt(rows[0].maxRank, 10) - 1;
    await this.model.save();
  }
}

module.exports = Bikecheck;
