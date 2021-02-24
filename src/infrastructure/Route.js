const { NotImplementedError } = require('./errors');

class Route {
  static get middlewareClsList() {
    return [];
  }

  static get HandlerCls() {
    return null;
  }

  constructor(bot, eventBus) {
    this.bot = bot;
    this.eventBus = eventBus;

    this.middlewares = this.constructor.middlewareClsList.map((Cls) => new Cls(bot, eventBus));
    this.handler = new this.constructor.HandlerCls(bot, eventBus);
  }

  isMatching() { // eslint-disable-line
    throw new NotImplementedError();
  }

  async process(telegramEntity) { // eslint-disable-line
    let processedEntity = telegramEntity;

    for (const middleware of this.middlewares) { // eslint-disable-line
      processedEntity = await middleware.process(processedEntity); // eslint-disable-line

      if (!processedEntity) {
        return;
      }
    }

    await this.handler.handle(processedEntity);
  }
}

module.exports = Route;
