const jwt = require('jsonwebtoken');
console.log('auth')

module.exports = (req, res, next) => {
  try {
console.log('test auth');
    const token = req.headers.authorization.substr(6);
    console.log('auth req', req.headers.authorization),
    console.log('auth token', token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('auth decodedtoken', decodedToken)
    const userId = decodedToken.id;
    console.log('auth userid',userId)

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