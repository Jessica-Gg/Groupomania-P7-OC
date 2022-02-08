const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('test auth');
    const token = req.headers.authorization.substr(6);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;

    if (req.body.id && req.body.id !== userId) {
      throw '403: unauthorized request';
    } else {
      console.log('auth next', userId)
      next();
    }
  } catch {
    console.log('error auth') 
    res.status(401).json({  
      error: new Error('Invalid request!')
    });
  }
};