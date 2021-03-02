const Entity = require('./Entity');
const models = require('../models');

class User extends Entity {
  static get modelClass() {
    return models.User;
  }

  static async findById(id) {
    const model = await this.modelClass.findOne({ where: { id } });

    if (!model) {
      return null;
    }

    return new this(model);
  }

  get id() {
    return this.model.id;
  }

  get firstName() {
    return this.model.firstName;
  }

  get stravaLink() {
    return this.model.stravaLink;
  }

  get username() {
    return this.model.username;
  }

  setStravaLink(value) {
    this.model.stravaLink = value;
    return this.model.save();
  }
}

module.exports = User;
