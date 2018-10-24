const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: String
});

const Event = mongoose.model('events', eventSchema);

module.exports = {
  GetEvents: () => Event.find(),

  CreateEvent: event => Event.create(event),

  UpdateEvent: ({ _id, name, date }) => Event.findByIdAndUpdate(_id, { 
    $set: {
      name,
      date
    } 
  }).exec(),

  DeleteEvent: _id => Event.findByIdAndDelete(_id).exec()
};