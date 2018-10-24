const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET;

module.exports = {
  Post: async function(req, res){
    const { email, password } = req.body;    
    const user = await User.GetUserByEmail(email);
    if(user && user.password === password){
      const token = jwt.sign({ email }, jwtSecret);
      res.send(token);
    } else res.sendStatus(400);
  }
};