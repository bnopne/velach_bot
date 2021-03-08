const DTO = require('../DTO');
const commands = require('../../text/callback-query-commands');

class CallbackData extends DTO {
  static createLikeForBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.like);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createDislikeForBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.dislike);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowPreviousBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.showPreviousBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowNextBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.showNextBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowPreviousDeletedBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.showPreviousDeletedBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowNextDeletedBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.showNextDeletedBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createDeleteBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.deleteBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createRestoreBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.restoreBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createBanBikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.banBikecheck);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowTopBikecheck(position) {
    const data = new this();
    data.setField('command', commands.showTopBikecheck);
    data.setField('position', position);
    return data;
  }

  static createShowTopSellingBikecheck(position) {
    const data = new this();
    data.setField('command', commands.showTopSellingBikecheck);
    data.setField('position', position);
    return data;
  }

  static createToggleOnSale(bikecheck) {
    const data = new this();
    data.setField('command', commands.toggleOnSale);
    data.setField('bikecheckId', bikecheck.id);
    return data;
  }

  static createShowNextOnSaleBikecheck(position) {
    const data = new this();
    data.setField('command', commands.showOnSaleBikecheck);
    data.setField('position', position + 1);
    return data;
  }

  static createShowPreviousOnSaleBikecheck(position) {
    const data = new this();
    data.setField('command', commands.showOnSaleBikecheck);
    data.setField('position', position - 1);
    return data;
  }

  static createForBumpbikecheck(bikecheck) {
    const data = new this();
    data.setField('command', commands.bumpOnSaleBikecheck);
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
