const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
var jwt = require("jsonwebtoken");
const registerroute = require("./routes/register");
const login = require("./routes/login");
const port = 8080;
const registerschema = require("./models/registerschema");
const mongoose = require("mongoose");
const postroute = require("./routes/Post");
mongoose.connect("mongodb://localhost/Assignment");
const secret = "SUCCESS";
/////middleware to check whether the user is login or not
app.use("/posts", (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("test ")[1];
    ////eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjI5MDg0OTEsImRhdGEiOiI2MzFkZWEyYTBmODAwZTM2YjllMjhkZWEiLCJpYXQiOjE2NjI5MDQ4OTF9.chtkQgSu05r29_ElY7rOJ2aSDc3w5rv44ORECFGUPg
    jwt.verify(token, secret, async function (err, decoded) {
      if (err) {
        res.status(500).json({
          status: "failed",
          message: "Not Authenticated",
        });
      }
      console.log(decoded);
      const user = await registerschema.findOne({ _id: decoded.data });
      console.log(user);
      req.user = user._id;
      console.log(user);
      console.log(req.user);
      next();
    });
  } else {
    return res.status(500).json({
      status: "failed",
      message: "Invalid token",
    });
  }
});
///checking the server
app.get("/", (req, res) => {
  res.json("server is working");
});

////router
app.use("/register", registerroute);
app.use("/login", login);
app.use("/posts", postroute);

// listening to port
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
