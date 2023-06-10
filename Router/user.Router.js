const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { calculateModel } = require("../Model/calculate.model");
const { authentication } = require("../Middleware/authentication.middleware");
const secretKey = "emi";

userRouter.post("/register", async (req, res) => {
  const ifAvailable = await userModel.find({ email: req.body.email });

  try {
    if (ifAvailable.length > 0) {
      res.send({ msg: "Email already registered" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) console.log(err);

        const data = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        await data.save();
        res.send({ msg: "User successfully created" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const ifAvailable = await userModel.find({ email: req.body.email });

  try {
    if (ifAvailable.length === 0) {
      res.send({ msg: "User doesn't Exist" });
    } else {
      bcrypt.compare(
        req.body.password,
        ifAvailable[0].password,
        async (err, result) => {
          if (err) console.log(err);

          if (result) {
            jwt.sign(
              { userId: ifAvailable[0]._id },
              secretKey,
              (err, token) => {
                if (err) console.log(err);

                res.send({ msg: "Successfully logged in", token });
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/", authentication, async (req, res) => {
  try {
    let data = await calculateModel.find({ _id: req.body.userId });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { userRouter };
