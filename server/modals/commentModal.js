import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  caption: String,
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
