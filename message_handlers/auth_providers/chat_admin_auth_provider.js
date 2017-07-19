const BaseAuthProvider = require('./base_auth_provider');

class ChatAdminAuthProvider extends BaseAuthProvider {

  async isAuthorized() {
    const userToAuthorize = this._message.getSender();

    const chatAdmins = await this._bot.getChatAdministrators(this._message.getChat().getId());

    for (var i = 0; i < chatAdmins.length; i++) {

      if (chatAdmins[i].user.id == userToAuthorize.getId()) {
        return true;
      };

      return false;

    };
  };

};

module.exports = ChatAdminAuthProvider;
