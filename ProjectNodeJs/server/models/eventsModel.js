const mongoose      = require('mongoose'),
      schema        = mongoose.Schema;

let eventSchema = new schema ({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String },
  user: { type: schema.Types.ObjectId, ref: 'user' },
}, {
  collection: 'events'
})

let eventsModel = mongoose.model('events', eventSchema);

module.exports = eventsModel;
