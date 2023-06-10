const express = require("express");
const emiRouter = express.Router();
const { calculateModel } = require("../Model/calculate.model");

emiRouter.get("/", async (req, res) => {
  const userId = req.body.userId;

  try {
    const data = await calculateModel.find({ userId });

    res.send({ data });
  } catch (error) {
    res.send(error);
  }
});

emiRouter.post("/calculate", async (req, res) => {
  const { userId, loanAmount, interest, tenure } = req.body;
  let r = interest / 12 / 100;
  r = r.toFixed(6);
  let e = loanAmount * r * (1 + r) * tenure;
  let m = (1 + r) * tenure - 1;
  let emi = e / m;
  emi = emi.toFixed(5);
  try {
    const data = new calculateModel({
      userId,
      loanAmount,
      interest,
      tenure,
      rateOfInterest: r,
      emi,
    });
    await data.save();
    console.log(data);
    res.send({ data });
  } catch (error) {
    res.send(error);
  }
});

emiRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await calculateModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted successfuly" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = { emiRouter };
