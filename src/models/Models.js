const path = require('path');
const fs = require('fs');

require('pg').defaults.parseInt8 = true; // потому что по умолчанию pg возвращает поля типа BIGINT как строки
const Sequelize = require('sequelize');

const settings = require('../settings');


class Models {
  constructor() {
    this.sequelize = new Sequelize(
      {
        host: settings.get('db.host'),
        port: settings.get('db.port'),
        username: settings.get('db.user'),
        password: settings.get('db.password'),
        database: settings.get('db.database'),
        dialect: settings.get('db.dialect'),
        logging: false,
        define: {
          timestamps: false,
          freezeTableName: true,
        },
        operatorsAliases: Sequelize.Op,
      },
    );

    const models = fs.readdirSync(__dirname)
      .filter(p => p.endsWith('.js'))
      .filter(p => p !== 'index.js')
      .filter(p => p !== 'Models.js')
      .reduce((acc, p) => {
        const model = this.sequelize.import(path.resolve(__dirname, p));
        acc[model.name] = model;
        return acc;
      }, {});

    Object.keys(models).forEach((key) => {
      models[key].options.associate(models[key], models);
    });

    Object.assign(this, models);
  }

  createTables() {
    return this.sequelize.sync({ force: true });
  }

  dropTables() {
    return this.sequelize.drop({ cascade: true });
  }

  closeConnections() {
    return this.sequelize.connectionManager.close();
  }
}

module.exports = Models;
