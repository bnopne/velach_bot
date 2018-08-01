const Entity = require('./Entity');
const models = require('../models');


class UserChatMtm extends Entity {
  static get modelClass() {
    return models.UserChatMtm;
  }
}


module.exports = UserChatMtm;
