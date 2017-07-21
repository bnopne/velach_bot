const fs = require('fs');
const FilePathManager = require('../file_path_manager');

class TelegramDownloadManager {

  constructor(bot) {
    this._bot = bot;
    this._pathManager = new FilePathManager(process.cwd());
  };

  async downloadBikePhoto(photoId) {

    const savedPhotoPath = await this._bot.downloadFile(
      photoId,
      this._pathManager.getTempDirPath()
    );

    await this.mv(
      savedPhotoPath,
      this._pathManager.getBikePhotoPath(photoId)
    );

  };

  async mv(pathA, pathB) {
    return new Promise((resolve, reject) => {

      fs.rename(pathA, pathB, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        };
      });

    });
  };

};

module.exports = TelegramDownloadManager;
