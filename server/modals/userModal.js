import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  uname: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
  },
  pwd: String,
  picture: {
    type: String,
    default: "https://rb.gy/q53iun",
  },
  bio: String,
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  reels: [{ type: Schema.Types.ObjectId, ref: "Reel" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

userSchema.index({ uname: "text" });
const User = mongoose.model("User", userSchema);

export default User;
