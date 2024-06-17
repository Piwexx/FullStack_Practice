const UserRepository = require('../../repositories/user/userRepository');
const { BadRequestError, UnauthenticatedError } = require('../../errors');

class UserService {
  
  async login(body) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestError('Please provide username and password');
    }

    const user = await UserRepository.findByUsername(username);

    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials');
    }

    const passwordCorrect = await UserRepository.comparePassword(user, password);
    if (!passwordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = userRepository.createToken(user);

    return {
      token: token,
      username: user.username,
      name: user.name
    };
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError('No se encontraron usuarios');
    }

    return user;
  }
  
  async register({ username, name, password }) {
    if (!username || !name || !password) {
      throw new BadRequestError('Please provide username, password and name');
    }

    const user = await UserRepository.createUser({ username, password, name });

    if (!user) {
      throw new UserNotFoundError('No se creó el usuario');
    }

    return user;
  }
}

module.exports = new UserService();
