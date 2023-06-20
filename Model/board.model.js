const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  userId: String,
  name: { type: String, isRequired: true },
});
const boardModel = mongoose.model("Board", boardSchema);

module.exports = { boardModel };
