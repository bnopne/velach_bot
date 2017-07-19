class TelegramUser {

  constructor(rawUser) {
    this._rawUser = rawUser;
  };

  getId() {
    return this._rawUser.id;
  };

  getUsername() {
    return this._rawUser.username;
  };

  getFirstName() {
    return this._rawUser.first_name;
  };

  getLastName() {
    return this._rawUser.last_name;
  };

  getFullInfo() {
    return {
      id: this.getId(),
      username: this.getUsername(),
      firstName: this.getFirstName(),
      lastName: this.getLastName()
    };
  };

};

module.exports = TelegramUser;
