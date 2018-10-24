const Event = require('../models/evenModel');

module.exports = { 
  Get: async function (req, res) {
    let { date, page, pageSize=5 } = req.query;
    page = Number(page);
    pageSize = Number(pageSize);
    const query = Event.GetEvents();

    if(date) query.find({ date });
    
    if(page){
      query.limit(pageSize);
      query.skip(page * (pageSize - 1));
    }

    const result = await query.exec();
    res.json(result);
  },

  Put: async function (req, res) {
    const { name, date} = req.body;
    if(!name || !Date.parse(date)){
      res.sendStatus(400);
      return;
    }
    const event = await Event.CreateEvent(req.body);
    res.status(201).send(event._id);
  },

  Post: async function(req, res){
    const { _id, name, date } = req.body;
    if(!name || !_id || !Date.parse(date)){
      res.sendStatus(400);
      return;
    }
    await Event.UpdateEvent(req.body);
    res.end();
  },

  Delete: async function(req, res){
    const { eventId } = req.params;
    if(!eventId){
      res.sendStatus(400);
      return;
    }
    await Event.DeleteEvent(eventId);
    res.sendStatus(204);
  }
};