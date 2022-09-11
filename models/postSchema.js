const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "registerschema" },
});
// title, body, image, user
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
