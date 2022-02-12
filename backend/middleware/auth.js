const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    res.locals.userId = userId;
    next();
  } catch (error) {
    console.log('invalid token', error)
    throw new NotAllowedError('user not allowed')
  }
};