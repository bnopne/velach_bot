const DTO = require('../DTO');


class TelegramPhotoSize extends DTO {
  get fileId() {
    return this.getField('file_id');
  }

  get width() {
    return this.getField('width');
  }

  get height() {
    return this.getField('height');
  }
}


module.exports = TelegramPhotoSize;
