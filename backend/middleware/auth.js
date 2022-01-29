const jwt = require('jsonwebtoken');
console.log('auth')

module.exports = (req, res, next) => {
  try {
console.log('test auth');
    const token = req.headers.authorization.substr(6);
console.log('plop auth', req.headers.authorization );
console.log('plop token', token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
console.log('plop userId', userId);

    if (req.body.id && req.body.id !== userId) {
      throw '403: unauthorized request';
    } else {
      console.log('plop next', userId)
      next();
    }
  } catch {
    console.log('error auth') 
    res.status(401).json({  
      error: new Error('Invalid request!')
    });
  }
};