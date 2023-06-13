const express = require("express");
const jobRouter = express.Router();
const { jobModel } = require("../Model/job.model");

jobRouter.get("/", async (req, res) => {
  try {
    const data = await jobModel.find({});
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

jobRouter.post("/add", async (req, res) => {
  try {
    let date = Date().split(" ");
    req.body.postedAt = `${date[1]}-${date[2]}-${date[3]}`;
    const data = new jobModel(req.body);
    await data.save();
    res.send({ msg: "Job Successfully posted" });
  } catch (error) {
    res.send({ error });
  }
});

jobRouter.get("/filter", async (req, res) => {
  const filter = req.query;

  try {
    const data = await jobModel.find(filter);
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

jobRouter.get("/search", async (req, res) => {
  const { s } = req.query;
  const regex = new RegExp(s, "i");
  try {
    const data = await jobModel.find({
      language: regex,
    });
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { jobRouter };
