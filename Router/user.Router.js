const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// secretKey = socialMedia
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ1MGQ0YjUzOGYwMGUzMzZhOTlhODdkIiwiaWF0IjoxNjgzMDE5NTAzfQ.3LK9r2rqzwGwbji39AaUS8OfBJuSyjC3MPRegfaw5W8

userRouter.post("/register", async (req, res) => {
  try {
    const ifAvailable = await userModel.find({ email: req.body.email });

    if (ifAvailable.length === 0) {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) console.log({ err });

        const data = new userModel({
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          password: hash,
        });

        data.save();

        res.send({ msg: "Successfully Registered" });
      });
    } else {
      res.send({ msg: "Email Already Registered" });
    }
  } catch (error) {
    res.send({ error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const ifAvailable = await userModel.find({ email: req.body.email });

    if (ifAvailable.length === 0) {
      res.send({ msg: "User Not Registered" });
    } else {
      bcrypt.compare(
        req.body.password,
        ifAvailable[0].password,
        async (err, result) => {
          if (err) {
            res.send({ msg: "Wrong Credentials" });
          } else {
            if (result) {
              const token = jwt.sign(
                { user: ifAvailable[0]._id },
                "socialMedia"
              );
              res.send({ msg: "Successfully Logged in", token });
            } else {
              res.send({ msg: "Wrong Credentials" });
            }
          }
        }
      );
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { userRouter };
