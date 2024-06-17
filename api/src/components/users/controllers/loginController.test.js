const { login } = require('./loginController');
const { BadRequestError, UnauthenticatedError } = require('../../errors/index');
const { StatusCodes } = require('http-status-codes');
const {mockUser,mockToken} = require("../../test/helpers/helpes")

jest.mock('../repositories/userRepository', () => ({
  findByUsername: jest.fn(),
  comparePassword: jest.fn(),
  createToken: jest.fn(),
}));

const userRepository = require('../../repositories/userRepository');

describe('login function', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  test('should login successfully with valid credentials', async () => {
    req.body = {username: 'Juan@gmail.com', password: 'AAA1234'};
    
    userRepository.findByUsername.mockResolvedValue(mockUser);
    userRepository.comparePassword.mockResolvedValue(true);
    userRepository.createToken.mockReturnValue(mockToken);

    await login(req, res, next);

    expect(userRepository.findByUsername).toHaveBeenCalledWith('Juan@gmail.com');
    expect(userRepository.comparePassword).toHaveBeenCalledWith(mockUser, 'AAA1234');
    expect(userRepository.createToken).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      token: mockToken,
      username: mockUser.username,
      name: mockUser.name,
    });
  });

  test('should throw BadRequestError if username or password is missing', async () => {
    req.body = { username: 'Juan@gmail.com' };

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));

    req.body = { password: 'AAA1234' };

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
  });

  test('should throw UnauthenticatedError if user not found', async () => {
    req.body = { username: 'nonExistentUser', password: 'somePassword' };
    
    userRepository.findByUsername.mockResolvedValue(null);

    await login(req, res, next);

    expect(userRepository.findByUsername).toHaveBeenCalledWith('nonExistentUser');
    expect(next).toHaveBeenCalledWith(expect.any(UnauthenticatedError));
  });

  test('should throw UnauthenticatedError if password is incorrect', async () => {
    req.body = { username: 'Juan@gmail.com', password: 'AAAAAA' };
    
    userRepository.findByUsername.mockResolvedValue(mockUser);
    userRepository.comparePassword.mockResolvedValue(false);

    await login(req, res, next);

    expect(userRepository.findByUsername).toHaveBeenCalledWith('Juan@gmail.com');
    expect(userRepository.comparePassword).toHaveBeenCalledWith(mockUser, 'AAAAAA');
    expect(next).toHaveBeenCalledWith(expect.any(UnauthenticatedError));
  });

  test('should handle unexpected errors', async () => {
    req.body = { username: 'Juan@gmail.com', password: 'AAA1234' };
    
    userRepository.findByUsername.mockRejectedValue(new Error('Unexpected Error'));

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
