class NotImplementedError extends Error {
  constructor() {
    super('This is not yet implemented');
  }
}

class DoesntExistError extends Error {
  constructor() {
    super('Entity doesnt exist');
  }
}

class MessageHandlingError extends Error {
  constructor() {
    super('Error handling message');
  }
}

exports.NotImplementedError = NotImplementedError;
exports.DoesntExistError = DoesntExistError;
exports.MessageHandlingError = MessageHandlingError;
