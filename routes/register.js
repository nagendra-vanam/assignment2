const express = require("express");
const router = express.Router();
const registerSchema = require("../models/registerschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
///user registration
router.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({
    min: 6,
    max: 18,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
      console.log(password);
      const alredyuser = await registerSchema.findOne({ email });
      console.log(alredyuser);
      if (alredyuser) {
        return res.json({
          status: "registration failed",
          message: "email already used",
        });
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.json({
            status: "failed",
          });
        }
        console.log(hash);
        const users = await registerSchema.create({
          name,
          email,
          password: hash,
        });
        res.json({
          satatus: "success",
          users,
        });
      });
    } catch (e) {
      res.json({
        status: "registration failed",
        message: e.message,
      });
    }
  }
);

module.exports = router;
