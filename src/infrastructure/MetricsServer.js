const express = require('express');
const client = require('prom-client');

const settings = require('../settings');


class MetricsServer {
  constructor() {
    this.server = express();

    this.server.get(
      '/metrics',
      (req, res) => {
        res.set('Content-Type', client.register.contentType);
        res.end(client.register.metrics());
      },
    );
  }

  start() {
    this.server.listen(settings.get('metrics.server.port'));
  }
}


module.exports = MetricsServer;
