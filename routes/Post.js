const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
const post = require("../models/postSchema");
const router = express.Router();
router.get("/", async (req, res) => {
  const posts = await post.find();

  res.status(200).json({
    status: "Success",
    posts,
  });
});

router.post("/", async (req, res) => {
  const posts = await post.create({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    user: req.user,
  });
  res.status(200).json({
    status: "Success",
    posts,
  });
});

router.put("/:id", async (req, res) => {
  const posts = await post.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json({
    status: "success",
  });
});
router.delete("/:id", async (req, res) => {
  const posts = await post.findOneAndDelete({ _id: req.params.id }, req.body);

  res.status(200).json({
    status: "success",
  });
});
module.exports = router;
