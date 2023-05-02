const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
// const PORT = 4001;
// const MONGO_URL =
//   "mongodb+srv://avneesh:avneesh@cluster0.5qu5exk.mongodb.net/socialDB?retryWrites=true&w=majority";
app.use(cors());
const { userRouter } = require("./Router/user.Router");
const { postRouter } = require("./Router/post.Router");
const { authenticate } = require("./Middleware/authentication.middleware");

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db at PORT :", process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
