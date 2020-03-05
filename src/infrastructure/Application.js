const TelegramBot = require('node-telegram-bot-api');

const settings = require('../settings');
const TelegramMessage = require('./dto/TelegramMessage');
const CallbackQuery = require('./dto/CallbackQuery');
const Router = require('./Router');
const EventBus = require('./EventBus');

class Application {
  static get messageRoutes() {
    return [];
  }

  static get callbackQueryRoutes() {
    return [];
  }

  static get services() {
    return [];
  }

  constructor() {
    const botOptions = settings.get('telegram.proxyUrl')
      ? {
        request: {
          proxy: settings.get('telegram.proxyUrl'),
        },
      }
      : {};

    this.bot = new TelegramBot(settings.get('telegram.token'), botOptions);
    this.eventBus = new EventBus();

    const messageRoutes = this.constructor.messageRoutes.map(RouteCls => new RouteCls(this.bot, this.eventBus)); // eslint-disable-line
    this.messageRouter = new Router(messageRoutes);

    const callbackQueryRoutes = this.constructor.callbackQueryRoutes.map(RouteCls => new RouteCls(this.bot, this.eventBus)); // eslint-disable-line
    this.callbackQueryRouter = new Router(callbackQueryRoutes);

    this.services = this.constructor.services
      .map(ServiceCls => new ServiceCls(this.bot, this.eventBus));
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
  }

  async onMessage(rawMessageObject) {
    const message = new TelegramMessage(rawMessageObject);

    try {
      await this.messageRouter.route(message);
    } catch (error) {
      console.error(error);
    }
  }

  async onCallbackQuery(rawCallbackQueryObject) {
    const callbackQuery = new CallbackQuery(rawCallbackQueryObject);

    try {
      await this.callbackQueryRouter.route(callbackQuery);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Application;
