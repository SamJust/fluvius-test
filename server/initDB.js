const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fluvius').then(()=> console.log('Connected to DB')).catch(err => console.log(err));

const User = require('./models/userModel');

User.CreateUser({
  email: 'test@email.com',
  password: 'test'
}).then(data => {
  console.log('Initializing dun');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});