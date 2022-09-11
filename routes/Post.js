const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
const post = require("../models/postSchema");
const router = express.Router();
router.get("/", async (req, res) => {
  const posts = await post.find({ user: req.user });
  console.log(req.user);

  res.json({
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
  res.json({
    status: "Success",
    posts,
  });
});

router.put("/:id", async (req, res) => {
  const posts = await post.findOneAndUpdate({ _id: req.params.id }, req.body);
  const allposts = await post.find();
  res.json({
    status: "success",
    allposts,
  });
});
router.delete("/:id", async (req, res) => {
  const posts = await post.findOneAndDelete({ _id: req.params.id }, req.body);
  const allposts = await post.find();
  res.json({
    status: "success",
    allposts,
  });
});
module.exports = router;