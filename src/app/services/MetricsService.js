const io = require('@pm2/io');

const Service = require('../../infrastructure/Service');
const config = require('../../settings');
const { EVENT_TYPES } = require('../../infrastructure/events/constants');

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
    };
  }

  onIncomingMessage() {
    this.metrics.incomingMessages.inc();
  }

  onUserExecutesCommand() {
    this.metrics.commandRate.mark();
  }

  onUserSendsCallbackQuery() {
    this.metrics.callbackQueryRate.mark();
  }
}

module.exports = MetricsService;
