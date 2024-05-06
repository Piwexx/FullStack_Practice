const userRepository = require('../repositories/userRepository');
const {StatusCodes} = require('http-status-codes')
const {UserNotFoundError,BadRequestError} = require('../errors')

async function register(req, res, next) {
  try {
    const { username, name, password } = req.body;
  
    if(!username || !name || !password){
      throw new BadRequestError('Please provide username ,password and name')
    }

    const result = await userRepository.createUser({username,password,name})

    if (!result) {
      throw new UserNotFoundError('No se creó el usuario');
    }

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {register};