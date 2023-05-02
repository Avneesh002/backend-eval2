const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  user: String,
});

const postModel = mongoose.model("postDB", postSchema);

module.exports = { postModel };
