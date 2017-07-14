class BaseDbModule {

  constructor(client, neededModules) {
    this._client = client;
    this._neededModules = neededModules || {};
  };

};

module.exports = BaseDbModule;
