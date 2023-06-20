const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
require("dotenv").config();

const { userRouter } = require("./Router/user.Router");
const { emiRouter } = require("./Router/calculate.Route");
const { authentication } = require("./Middleware/authentication.middleware");
const { jobRouter } = require("./Router/job.Router");
const { boardRouter } = require("./Router/board.Router");
const { taskRouter } = require("./Router/task.Router");
const { subtaskRouter } = require("./Router/subtask.Router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/job", jobRouter);

app.use("/user", userRouter);
app.use(authentication);
app.use("/emi", emiRouter);
app.use("/board", boardRouter);
app.use("/task", taskRouter);
app.use("/subtask", subtaskRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB & server started on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
