const path = require('path');

class FilePathManager {

  constructor(rootDir) {
    this._rootDir = path.resolve(rootDir);

    this._MEDIA_DIR = path.join(this._rootDir, 'media');
    this._PICTURES_DIR = path.join(this._MEDIA_DIR, 'pictures');
    this._BIKE_PHOTOS_DIR = path.join(this._PICTURES_DIR, 'bikes');
    this._TEMP_DIR = path.join(this._MEDIA_DIR, 'temp');
  };

  getBikePhotoPath(photoId) {
    return path.join(
      this._BIKE_PHOTOS_DIR,
      photoId + '.jpg'
    );
  };

  getTempDirPath() {
    return this._TEMP_DIR;
  };

};

module.exports = FilePathManager;
