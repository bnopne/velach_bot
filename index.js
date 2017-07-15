const pg = require('pg');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const Bot = require('./bot');
const Db = require('./db');

var pool = new pg.Pool(config.get('database:postgres'));
var telegramBot = new TelegramBot(config.get('telegram:token'), { polling: false });

var bot = new Bot(pool, telegramBot);
