const Entity = require('./Entity');
const models = require('../models');


class BikecheckReport extends Entity {
  static get modelClass() {
    return models.BikecheckReport;
  }

  static async createForBikecheckByUser(bikecheck, user) {
    const model = await this.create({
      userId: user.id,
      bikecheckId: bikecheck.id,
    });

    return new this(model);
  }

  static async getForBikecheckByUser(bikecheck, user) {
    const model = await this.modelClass.findOne({
      where: {
        userId: user.id,
        bikecheckId: bikecheck.id,
      },
    });

    return model ? new this(model) : null;
  }

  static async getAllForBikecheck(bikecheck) {
    const reportModels = await this.modelClass.findAll({
      where: { bikecheckId: bikecheck.id },
    });

    return reportModels.map(model => new this(model));
  }
}


module.exports = BikecheckReport;
