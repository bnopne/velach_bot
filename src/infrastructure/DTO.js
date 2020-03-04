const _ = require('lodash');

class DTO {
  constructor(rawObject = {}) {
    this.rawObject = rawObject;
  }

  export() {
    return JSON.parse(JSON.stringify(this.rawObject));
  }

  getField(key) {
    return _.get(this.rawObject, [key], null);
  }

  setField(key, value) {
    _.set(this.rawObject, [key], value);
  }

  getNestedDTO(key, DTOClass) {
    const rawData = _.get(this.rawObject, [key], null);
    return rawData ? new DTOClass(rawData) : null;
  }

  setNestedDTO(key, dto) {
    _.set(this.rawObject, [key], dto.rawObject);
  }

  getNestedDTOArray(key, DTOClass) {
    const rawDataArray = _.get(this.rawObject, [key], null);

    const recursivelyGetDTO = arr => _.map(
      arr,
      element => _.isArray(element) ? recursivelyGetDTO(element, DTOClass) : new DTOClass(element), // eslint-disable-line
    );

    return rawDataArray
      ? recursivelyGetDTO(rawDataArray)
      : [];
  }

  setNestedDTOArray(key, dtos) {
    const recursivelyGetRawObjects = arr => _.map(
      arr,
      el => _.isArray(el) ? recursivelyGetRawObjects(el) : el.rawObject, // eslint-disable-line
    );

    _.set(this.rawObject, [key], recursivelyGetRawObjects(dtos));
  }
}

module.exports = DTO;
