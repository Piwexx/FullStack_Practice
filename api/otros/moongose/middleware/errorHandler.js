const errorHandler = (err, req, res, next) => {
    res.status(400).json({ message: 'bad Request' });
  };
  
  module.exports = errorHandler;