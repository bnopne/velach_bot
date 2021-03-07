const io = require('@pm2/io');

const Service = require('../../infrastructure/Service');
const config = require('../../settings');
const { EVENT_TYPES } = require('../../infrastructure/events/constants');
const commands = require('../../text/commands');
const callbackQueryCommands = require('../../text/callback-query-commands');

class MetricsService extends Service {
  constructor(bot, eventBus) {
    super(bot, eventBus);

    this.eventBus.on(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      this.onUserExecutesCommand.bind(this),
    );

    this.eventBus.on(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      this.onUserSendsCallbackQuery.bind(this),
    );

    this.eventBus.on(
      EVENT_TYPES.INCOMING_MESSAGE,
      this.onIncomingMessage.bind(this),
    );

    this.metrics = {
      commandRate: io.meter({
        name: 'Command Rate',
        samples: config.get('metrics.commandRateUnit'),
        timeframe: config.get('metrics.commandRateTimeWindow'),
      }),
      callbackQueryRate: io.meter({
        name: 'Callback Query Rate',
        samples: config.get('metrics.callbackQueryRateUnit'),
        timeframe: config.get('metrics.callbackQueryRateTimeWindow'),
      }),
      incomingMessages: io.counter({
        name: 'Messages Processed',
      }),
      commands: Object.keys(commands).reduce((acc, key) => ({
        ...acc,
        [commands[key]]: io.counter({ name: `${commands[key]}` }),
      }), {}),
      callbackQueryCommands: Object.keys(callbackQueryCommands).reduce((acc, key) => ({
        ...acc,
        [callbackQueryCommands[key]]: io.counter({ name: key }),
      }), {}),
    };
  }

  onIncomingMessage() {
    this.metrics.incomingMessages.inc();
  }

  onUserExecutesCommand(event) {
    this.metrics.commandRate.mark();

    if (event && event.command) {
      this.metrics.commands[event.command].inc();
    }
  }

  onUserSendsCallbackQuery(event) {
    this.metrics.callbackQueryRate.mark();

    if (event && event.command) {
      this.metrics.callbackQueryCommands[event.command].inc();
    }
  }
}

module.exports = MetricsService;
