const express = require("express");
const boardRouter = express.Router();
const { boardModel } = require("../Model/board.model");

boardRouter.get("/", async (req, res) => {
  try {
    let data = await boardModel.find({ userId: req.body.userId });
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

boardRouter.post("/add", async (req, res) => {
  try {
    const data = new boardModel(req.body);
    await data.save();
    res.send({ msg: "Board Successfully Created" });
  } catch (error) {
    res.send({ error });
  }
});

boardRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await boardModel.findByIdAndUpdate({ _id, id }, req.body);
    res.send({ msg: "Task Successfully Added" });
  } catch (error) {
    res.send({ error });
  }
});

boardRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await boardModel.findByIdAndDelete({ _id, id });
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    res.send({ error });
  }
});
module.exports = { boardRouter };
