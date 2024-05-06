const userRepository = require('../repositories/userRepository');
const {StatusCodes} = require('http-status-codes')
const {UserNotFoundError} = require('../errors')

async function getUser(req, res, next) {
  try {
    const {id} = req.user;
    const user = await userRepository.findById(id)

    if (!user) {
        throw new UserNotFoundError('No se encontraron usuarios');
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}



module.exports = {getUser};
