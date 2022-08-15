const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ticketSchema = new Schema({
  airlines: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ticket", ticketSchema);
