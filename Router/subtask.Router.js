const express = require("express");
const subtaskRouter = express.Router();
const { subtaskModel } = require("../Model/subtask.model");

subtaskRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await subtaskModel.find({ taskId: id });
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

subtaskRouter.post("/add", async (req, res) => {
  try {
    const data = new subtaskModel(req.body);
    await data.save();
    res.send({ msg: "Subtask added " });
  } catch (error) {
    res.send({ error });
  }
});

subtaskRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await subtaskModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Task Successfully Added" });
  } catch (error) {
    res.send({ error });
  }
});

subtaskRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await subtaskModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    res.send({ error });
  }
});
module.exports = { subtaskRouter };
