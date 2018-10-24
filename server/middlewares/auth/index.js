const jwt = require('jsonwebtoken');

const jwtSecret = process.env.SECRET;

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    console.log('err',err);
    res.sendStatus(403);
  }
};