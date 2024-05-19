import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

userSchema.pre("save", async function (next) {
  if (this.isModified("pwd")) {
    this.pwd = await bcrypt.hash(this.pwd, 10);
  }
  next();
});

userSchema.methods.comparePwd = async function (password) {
  return await bcrypt.compare(password, this.pwd);
};

userSchema.methods.genToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

userSchema.index({ uname: "text" });
const User = mongoose.model("User", userSchema);

export default User;
