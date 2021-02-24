const DTO = require('../DTO');

class CallbackData extends DTO {
  static createLikeForBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'like');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createDislikeForBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'dislike');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowPreviousBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'show-previous-bikecheck');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowNextBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'show-next-bikecheck');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createDeleteBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'delete-bikecheck');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createBanBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', 'ban-bikecheck');
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static deserialize(dataString) {
    const rawObject = JSON.parse(dataString);
    return new this(rawObject);
  }

  serialize() {
    return JSON.stringify(this.export());
  }

  get command() {
    return this.getField('command');
  }
}

module.exports = CallbackData;
