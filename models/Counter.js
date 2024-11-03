const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  completed: { type: Number, default: 0 },
  halfCompleted: { type: Number, default: 0 },
  registeredNoPayment: { type: Number, default: 0 },
  wasted: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", CounterSchema);
