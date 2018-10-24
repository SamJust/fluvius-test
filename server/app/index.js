const express = require('express')
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/fluvius').then(()=> console.log('Connected to DB')).catch(err => console.log(err));

const jsonBodyParser = bodyParser.json();

const userRouter = require('../routers/userRouter');
const eventRouter = require('../routers/eventRouter');

const app = express();

app.use(jsonBodyParser);
app.use(userRouter);
app.use(eventRouter);

module.exports = app;