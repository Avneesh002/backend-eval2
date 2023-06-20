const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  boardId: String,

  title: String,
  description: String,
  status: String,
});
const taskModel = mongoose.model("Task", taskSchema);

module.exports = { taskModel };
