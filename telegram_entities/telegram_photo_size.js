class TelegramPhotoSize {

  constructor(rawPhotoSize) {
    this._rawPhotoSize = rawPhotoSize;
  };

  getFileId() {
    return this._rawPhotoSize.file_id;
  };

  getWidth() {
    return this._rawPhotoSize.width;
  };

  getHeight() {
    return this._rawPhotoSize.height;
  };

  getFileSize() {
    return ('file_size' in this._rawPhotoSize)
      ? this._rawPhotoSize.file_size
      : null;
  };

};

module.exports = TelegramPhotoSize;
