const jwt = require('jsonwebtoken');
console.log('auth')

module.exports = (req, res, next) => {
  try {
    console.log('test auth')
  //  const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization.substr(6);
    console.log('plop', req.headers.authorization);
    console.log('plop token', token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('plop', decodedToken);
    const userId = decodedToken.id;
    console.log('plop', userId);

    if (req.body.id && req.body.id !== userId) {
      console.log('test auth if', userId)
      throw '403: unauthorized request';
    } else {
      console.log('plop next')
      next();
    }
  } catch {
    res.status(401).json({   
      error: new Error('Invalid request!')
    });
  }
};