const moment = require('moment');

const Middleware = require('../../../../infrastructure/Middleware');
const settings = require('../../../../settings');

class AgeCheckMiddleware extends Middleware {
  async process(message) { // eslint-disable-line
    const messageAge = moment().diff(moment.unix(message.date), 'seconds');

    return messageAge <= settings.get('telegram.messageTTL')
      ? message
      : null;
  }
}

module.exports = AgeCheckMiddleware;
