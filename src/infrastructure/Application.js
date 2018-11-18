const TelegramBot = require('node-telegram-bot-api');

const settings = require('../settings');
const TelegramMessage = require('./dto/TelegramMessage');
const CallbackQuery = require('./dto/CallbackQuery');
const Router = require('./Router');
const metrics = require('./metrics');
const MetricsServer = require('./MetricsServer');


class Application {
  static get messageRoutes() {
    return [];
  }

  static get callbackQueryRoutes() {
    return [];
  }

  constructor() {
    this.bot = new TelegramBot(settings.get('telegram.token'));
    this.metricsServer = new MetricsServer();

    const messageRoutes = this.constructor.messageRoutes.map(RouteCls => new RouteCls(this.bot));
    this.messageRouter = new Router(messageRoutes);

    const callbackQueryRoutes = this.constructor.callbackQueryRoutes.map(RouteCls => new RouteCls(this.bot)); // eslint-disable-line
    this.callbackQueryRouter = new Router(callbackQueryRoutes);
  }

  async start() {
    this.bot.info = await this.bot.getMe();

    this.bot.on(
      'message',
      this.onMessage.bind(this),
    );

    this.bot.on(
      'callback_query',
      this.onCallbackQuery.bind(this),
    );

    this.bot.startPolling();
    this.metricsServer.start();
  }

  async onMessage(rawMessageObject) {
    const message = new TelegramMessage(rawMessageObject);

    metrics.totalMessages.inc();
    const stopTimer = metrics.messageProcessingDuration.startTimer();

    try {
      await this.messageRouter.route(message);
    } catch (error) {
      console.error(error);
      metrics.messageProcessingErrors.inc();
    } finally {
      stopTimer();
    }
  }

  async onCallbackQuery(rawCallbackQueryObject) {
    const callbackQuery = new CallbackQuery(rawCallbackQueryObject);

    metrics.totalCallbackQueries.inc();
    const stopTimer = metrics.callbackQueryProcessingDuration.startTimer();

    try {
      await this.callbackQueryRouter.route(callbackQuery);
    } catch (error) {
      console.error(error);
      metrics.callbackQueryProcessingErrors.inc();
    } finally {
      stopTimer();
    }
  }
}


module.exports = Application;
