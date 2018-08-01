const settings = require('./settings');

module.exports = {
  url: settings.get('db.connectionString'),
  dialect: settings.get('db.dialect'),
};
