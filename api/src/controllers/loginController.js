const userRepository = require('../repositories/userRepository');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require ('../errors')


async function login(req,res,next){
    try {
        const { body } = req;
        const { username, password } = body;
        

        if(!username || !password ){
            throw new BadRequestError('Please provide username and password')
        }
    
        const user = await userRepository.findByUsername(username);
        
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials');
        }
    
        const passwordCorrect = await userRepository.comparePassword(user,password)
        if (!passwordCorrect) {
             throw new UnauthenticatedError('Invalid Credentials');
        }
    
        const token = userRepository.createToken(user)
    
        res.status(StatusCodes.OK).json({
            token: token,
            username: user.username,
            name: user.name
        });
    } catch (error) {
        next((error));
    }
}

module.exports = {login}

