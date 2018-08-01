const Entity = require('./Entity');
const models = require('../models');


class Chat extends Entity {
  static get modelClass() {
    return models.Chat;
  }

  static async findById(id) {
    const model = await this.modelClass.findOne({
      where: { id },
    });

    return model ? new this(model) : null;
  }

  get id() {
    return this.model.id;
  }
}


module.exports = Chat;
