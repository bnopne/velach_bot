const Event = require('./Event');
const { EVENT_TYPES } = require('./constants');

class IncomingMessage extends Event {
  constructor() {
    super(EVENT_TYPES.INCOMING_MESSAGE);
  }
}

module.exports = IncomingMessage;
