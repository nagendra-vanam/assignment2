const express = require("express");
const router = express.Router();
const User = require("../models/registerschema");
var jwt = require("jsonwebtoken");
const secret = "SUCCESS";
// const registerSchema = require("../models/registerschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
///user registration
router.post(
  "/",
  body("email").isEmail(),
  body("password"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const data = await User.findOne({ email });
      console.log(data.password);
      console.log(data);

      if (!data) {
        return res.status(400).json({
          status: "failed",
          message: "User is not registerd",
        });
      }

      bcrypt.compare(password, data.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: "failed",
            message: err.message,
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: data._id,
            },
            secret
          );

          res.status(200).json({
            status: "Sucess",
            token,
          });
        }
      });
    } catch (e) {
      res.status(400).json({
        status: "Login failed",
        message: e.message,
      });
    }
  }
);

module.exports = router;
