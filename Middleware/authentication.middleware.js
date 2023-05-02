const jwt = require("jsonwebtoken");
const os = require("os");

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    try {
      const verify = jwt.verify(token, "socialMedia");
      req.body.user = verify.user;

      if (os.type() === "Linux" && os.platform() === "android") {
        req.body.device = "Android";
      } else {
        req.body.device = "Windows";
      }
      next();
    } catch (error) {
      res.send({ msg: "Login failed" });
    }
  } else {
    res.send({ msg: "Login failed" });
  }
}

module.exports = { authenticate };
