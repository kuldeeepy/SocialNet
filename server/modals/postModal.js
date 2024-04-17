import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    default: "https://rb.gy/bsq5it",
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  caption: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
