const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class NoteNotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NoteNotFoundError;