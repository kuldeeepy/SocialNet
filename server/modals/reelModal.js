import mongoose, { Schema } from "mongoose";

const reelSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  video: {
    type: String,
    default: "https://www.youtube.com/watch?v=cDlfGq2sE_Q",
  },
  caption: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Reel = mongoose.model("Reel", reelSchema);

export default Reel;
