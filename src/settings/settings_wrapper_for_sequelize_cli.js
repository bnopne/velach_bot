const settings = require('./settings');

const user = settings.get('db.user');
const password = settings.get('db.password');
const host = settings.get('db.host');
const port = settings.get('db.port');
const database = settings.get('db.database');

module.exports = {
  url: `postgres://${user}:${password}@${host}:${port}/${database}`,
  dialect: settings.get('db.dialect'),
};
