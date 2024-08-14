const { StatusCodes } = require('http-status-codes');
const UserService = require('../service/userService');

async function getUser(req, res, next) {
  try {
    const { id } = req.user;
    const user = await UserService.getUserById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const response = await UserService.login(req.body);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { username, name, password } = req.body;

    const result = await UserService.register({ username, name, password });

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { register,login,getUser };