const pg = require('pg');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const Bot = require('./bot');
const Db = require('./db');

const pool = new pg.Pool(config.get('database:postgres'));
const telegramBot = new TelegramBot(config.get('telegram:token'), { polling: false });

const bot = new Bot(pool, telegramBot);

bot.start();
