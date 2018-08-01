const { exec } = require('child_process');
const fs = require('fs');

const minimist = require('minimist');

const models = require('./models');
const User = require('./entities/User');
const Chat = require('./entities/Chat');
const Bikecheck = require('./entities/Bikecheck');


async function execute(argv) {
  if (argv._.includes('create-schema')) {
    try {
      await models.createSchema();
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }

  if (argv._.includes('seed-db')) {
    await new Promise((resolve, reject) => {
      exec(
        'npx sequelize --config \'settings/settings_wrapper_for_sequelize_cli.js\' db:seed:all',
        (err, stdout, stderr) => {
          if (err) {
            console.error(stderr);
            reject(err);
          } else {
            console.log(stdout);
            resolve();
          }
        },
      );
    });
  }

  if (argv._.includes('apply-migrations')) {
    await new Promise((resolve, reject) => {
      exec(
        'npx sequelize --config \'settings/settings_wrapper_for_sequelize_cli.js\' db:migrate',
        (err, stdout, stderr) => {
          if (err) {
            console.error(stderr);
            reject(err);
          } else {
            console.log(stdout);
            resolve();
          }
        },
      );
    });
  }

  if (argv._.includes('upload-old-users') && argv.f) {
    try {
      const data = JSON.parse(fs.readFileSync(argv.f));
      await Promise.all(data.map(userData => User.createOrUpdate(userData)));
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }

  if (argv._.includes('upload-old-chats') && argv.f) {
    try {
      const data = JSON.parse(fs.readFileSync(argv.f));
      await Promise.all(data.map(chatData => Chat.createOrUpdate(chatData)));
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }

  if (argv._.includes('upload-old-bikechecks') && argv.f) {
    try {
      const data = JSON.parse(fs.readFileSync(argv.f));
      for (const userData of data) { // eslint-disable-line
        await Bikecheck.createOrUpdate({ // eslint-disable-line
          userId: userData.userId,
          telegramImageId: userData.telegramImageId,
          isActive: true,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }
}


const parsedArgs = minimist(process.argv.slice(2));
execute(parsedArgs);
