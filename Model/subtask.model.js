const mongoose = require("mongoose");

const subtaskSchema = mongoose.Schema({
  taskId: String,
  tasks: [
    {
      title: String,
      isCompleted: Boolean,
    },
  ],
});
const subtaskModel = mongoose.model("SubTask", subtaskSchema);

module.exports = { subtaskModel };
