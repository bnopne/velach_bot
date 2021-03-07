const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const minimist = require('minimist');
const moment = require('moment');
const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');

const settings = require('./src/settings');
const models = require('./src/models');

async function execute(argv) {
  if (argv._.includes('create-tables')) {
    try {
      await models.createTables();
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }

  if (argv._.includes('drop-tables')) {
    try {
      await models.dropTables();
    } catch (err) {
      console.error(err);
    } finally {
      await models.sequelize.connectionManager.close();
    }
  }

  if (argv._.includes('create-migration')) {
    await new Promise((resolve, reject) => {
      exec(
        `npx sequelize --config ${path.join('src', 'settings', 'settings-wrapper-for-sequelize-cli.js')} migration:generate --name ${argv.name}`,
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
        `npx sequelize --config ${path.join('src', 'settings', 'settings-wrapper-for-sequelize-cli.js')} --migrations-path ${path.join('src', 'migrations')} db:migrate`,
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

  if (argv._.includes('backup-db')) {
    const dumpFilename = `velach_bot_database_dump_${moment().format('DD-MM-YYYY_HH_mm_ss')}.sql`;
    const dumpFullname = path.join('/tmp', dumpFilename);

    await new Promise((resolve, reject) => {
      exec(
        `pg_dump ${settings.get('db.database')} > ${dumpFullname}`,
        {
          env: {
            PGHOST: settings.get('db.host'),
            PGPORT: settings.get('db.port'),
            PGUSER: settings.get('db.user'),
            PGPASSWORD: settings.get('db.password'),
          },
        },
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        },
      );
    });

    const dropbox = new Dropbox({
      fetch,
      accessToken: settings.get('dropbox.accessToken'),
    });

    const dump = fs.readFileSync(dumpFullname);

    await dropbox.filesUpload({
      contents: dump,
      path: `/${dumpFilename}`,
    });
  }
}

const parsedArgs = minimist(process.argv.slice(2));
execute(parsedArgs);
