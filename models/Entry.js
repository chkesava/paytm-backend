const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Entry", EntrySchema);
