const BaseAuthProvider = require('./base_auth_provider');

class ChatAdminAuthProvider extends BaseAuthProvider {

  async isAuthorized() {
    const userToAuthorize = this._message.getSender();

    const chatAdmins = await this._bot.getChatAdministrators(this._message.getChat()
      .getId());

    let isAdmin = false;

    for (let i = 0; i < chatAdmins.length; i++) {
      if (chatAdmins[i].user.id === userToAuthorize.getId()) {
        isAdmin = true;
        break;
      }
    }

    return isAdmin;
  }
}

module.exports = ChatAdminAuthProvider;
