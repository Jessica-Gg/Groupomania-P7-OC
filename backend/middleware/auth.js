const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('test auth');
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    res.locals.userId = userId;
    console.log('auth next', userId)
    next();
  } catch (error) {
    console.log('invalid token', error) 
    res.status(401).json({  
      error: new Error('Invalid request!')
    });
  }
};

