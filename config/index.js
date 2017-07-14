const path = require('path');
const nconf = require('nconf');

nconf
  .env()
  .file({
    file: path.join(__dirname, 'config.json')
  });

module.exports = nconf;
