const express = require("express");
const postRouter = express.Router();
const { postModel } = require("../Model/post.model");
const jwt = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
  try {
    let data = await postModel.find({ user: req.body.user });

    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

postRouter.post("/add", async (req, res) => {
  try {
    const data = new postModel(req.body);
    await data.save();
    res.send({ msg: "Post added successfully" });
  } catch (error) {
    res.send({ error });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await postModel.find({ _id: id });

    if (req.body.user === data[0].user) {
      await postModel.findOneAndUpdate(req.body);

      res.send({ msg: "Post updated successfully" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ error });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await postModel.find({ _id: id });
    console.log(data);
    if (req.body.user === data[0].user) {
      await postModel.findByIdAndDelete({ _id: id });

      res.send({ msg: "Post deleted successfully" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { postRouter };
