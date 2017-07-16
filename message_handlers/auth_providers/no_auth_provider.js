const BaseAuthProvider = require('./base_auth_provider');

class NoAuthProvider extends BaseAuthProvider {

  isAuthorized() {
    return true;
  };

};

module.exports = NoAuthProvider;
