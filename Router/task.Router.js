const express = require("express");
const taskRouter = express.Router();
const { taskModel } = require("../Model/task.model");
const { boardModel } = require("../Model/board.model");

taskRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let data = await taskModel.find({ boardId: id });
    let board = await boardModel.find({ _id: id });
    res.send({ data, board });
  } catch (error) {
    console.log(error);
  }
});

taskRouter.post("/add", async (req, res) => {
  try {
    const data = new taskModel(req.body);
    await data.save();
    res.send({ msg: "Task Successfully Created" });
  } catch (error) {
    res.send({ error });
  }
});

taskRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await taskModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Task Successfully Updated" });
  } catch (error) {
    res.send({ error });
  }
});

taskRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await taskModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    res.send({ error });
  }
});
module.exports = { taskRouter };
