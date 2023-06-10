const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
require("dotenv").config();
 
const { userRouter } = require("./Router/user.Router");
const { emiRouter } = require("./Router/calculate.Route");
const {authentication} = require('./Middleware/authentication.middleware');

const app = express();


app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use(authentication);
app.use("/emi", emiRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB & server started on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
