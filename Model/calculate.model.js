const mongoose = require("mongoose");

const calculateSchema = mongoose.Schema({
  loanAmount: { type: Number, required: true },
  interest: { type: Number, required: true },
  tenure: { type: Number, required: true },
  userId: String,
  emi: Number,
  rateOfInterest: Number,
});

const calculateModel = mongoose.model("loan", calculateSchema);

module.exports = { calculateModel };
