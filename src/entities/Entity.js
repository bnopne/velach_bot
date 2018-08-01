const { NotImplementedError } = require('../infrastructure/errors');


class Entity {
  static get modelClass() {
    throw new NotImplementedError();
  }

  static async create(params = {}) {
    const model = await this.modelClass.create(params);
    return new this(model);
  }

  static async createOrUpdate(params = {}) {
    const [model] = await this.modelClass.upsert(params, { returning: true });
    return new this(model);
  }

  constructor(model) {
    this.model = model;
  }

  delete() {
    return this.model.destroy();
  }
}

module.exports = Entity;
