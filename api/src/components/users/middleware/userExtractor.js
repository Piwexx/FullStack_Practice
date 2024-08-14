const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../../../common/errors')

const userExtractor = ( req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer') ) {
        throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1]; // El token está en la forma "Bearer <token>"

    if (!token) {
        throw new UnauthenticatedError('No token provided');
    }

    jwt.verify(token,process.env.SECRET, (err, decoded) => {
        if (err) {
            throw new UnauthenticatedError('Not authorized to access this route');
        }
        const {id,username} = decoded
        req.user = {id,username} 
        next();
    });
  };
  
module.exports = userExtractor;