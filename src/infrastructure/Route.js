const { NotImplementedError } = require('./errors');


class Route {
  static get middlewareClsList() {
    return [];
  }

  static get HandlerCls() {
    return null;
  }

  constructor(bot) {
    this.bot = bot;
    this.middlewares = this.constructor.middlewareClsList.map(Cls => new Cls(bot));
    this.handler = new this.constructor.HandlerCls(bot);
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
