const prometheusClient = require('prom-client');

module.exports = {
  messageProcessingDuration: new prometheusClient.Histogram({
    name: 'velach_bot_message_processing_duration',
    help: 'How long it takes to process message',
  }),

  totalMessages: new prometheusClient.Counter({
    name: 'velach_bot_total_messages',
    help: 'How many messages were processed',
  }),

  messageProcessingErrors: new prometheusClient.Counter({
    name: 'velach_bot_message_processing_errors',
    help: 'How many errors occured during message processing',
  }),

  callbackQueryProcessingDuration: new prometheusClient.Histogram({
    name: 'velach_bot_callback_query_processing_duration',
    help: 'How long it takes to process callback query',
  }),

  totalCallbackQueries: new prometheusClient.Counter({
    name: 'velach_bot_total_callback_queries',
    help: 'How many callback queries were processed',
  }),

  callbackQueryProcessingErrors: new prometheusClient.Counter({
    name: 'velach_bot_callback_query_processing_errors',
    help: 'How many errors occured during callback query processing',
  }),
};
