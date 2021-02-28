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

  static async findAllPublic() {
    const chatModels = await this.modelClass.findAll({
      where: {
        type: 'supergroup',
      },
    });

    return chatModels.map((m) => new this(m));
  }

  get id() {
    return this.model.id;
  }

  get type() {
    return this.model.type;
  }
}

module.exports = Chat;
