const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('users', userSchema);

module.exports = {
  GetUserByEmail: email => User.findOne({ email }).exec(),

  CreateUser: user => User.create(user)
};