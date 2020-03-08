const { EventEmitter } = require('events');

const { EVENT_TYPES } = require('./events/constants');

class EventBus {
  constructor() {
    this.emitter = new EventEmitter();
  }

  onUserFailsToExecuteCommand(listener) {
    this.emitter.on(
      EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
      listener,
    );
  }

  emitUserFailsToExecuteCommand(event) {
    this.emitter.emit(
      EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
      event,
    );
  }

  onUserInteracts(listener) {
    this.emitter.on(
      EVENT_TYPES.USER_INTERACTS,
      listener,
    );
  }

  emitUserInteracts(event) {
    this.emitter.emit(
      EVENT_TYPES.USER_INTERACTS,
      event,
    );
  }
}

module.exports = EventBus;
