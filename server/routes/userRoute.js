import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../modals/userModal.js";
import { wrapper } from "../controllers/customError.js";
import isAuthenticated from "../controllers/userAuth.js";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });
const router = express.Router();

router.post(
  "/signup",
  wrapper(async (req, res) => {
    let { uname, pwd, email } = req.body;
    if (!uname || !pwd || !email)
      return res.status(401).json({ message: "Provide all the details!" });

    let user = await User.findOne({ uname });
    if (user) return res.status(401).send("User already exist, please login");

    let hashed = bcrypt.hashSync(pwd, 10);
    let newUser = await User.create({ uname, email, pwd: hashed });

    let tkn = jwt.sign(
      { uname: newUser.uname, userId: newUser._id },
      process.env.JWT_SECRET
    );

    let kukiOpt = {
      expire: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("key", tkn, kukiOpt)
      .json({ user: newUser.uname, message: "Registration Successful" });
  })
);

router.post(
  "/login",
  wrapper(async (req, res) => {
    let { uname, pwd } = req.body;
    if (!uname || !pwd)
      return res.status(401).json({ message: "Provide all the details!" });

    let user = await User.findOne({ uname });

    if (!user) return res.status(401).send("User not found");

    if (!bcrypt.compare(pwd, user.pwd))
      return res
        .status(401)
        .json({ messgae: "Incorrect username or password" });
    let tkn = jwt.sign(
      { uname: user.uname, userId: user._id },
      process.env.JWT_SECRET
    );
    let kukiOpt = {
      expire: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.status(200).cookie("key", tkn, kukiOpt).json({
      user: user.uname,
      userId: user._id,
      message: "Login Successful",
    });
  })
);

router.get("/logout", (req, res) => {
  res.clearCookie("key");
  res.status(200).json({ messgae: "Logged Out Successfully" });
});

router.get("/checkauth", isAuthenticated, (req, res) => {
  if (req.user.user) return res.status(402).send("Access denied");
  res.status(200).send(req.user);
});

router.get(
  "/profile/:username",
  isAuthenticated,
  wrapper(async (req, res) => {
    let { username } = req.params;
    let user = await User.findOne({ uname: username }).populate("posts");
    if (!user) return res.status(404).json({ message: "No user found" });
    user.pwd = null;
    res.status(200).send(user);
  })
);

router.patch(
  "/:id/edit",
  upload.single("image"),
  wrapper(async (req, res) => {
    let { id } = req.params;
    if (req.file?.path === undefined) return;
    let user = await User.findByIdAndUpdate(id, { picture: req.file.path });
    res.send(user);
  })
);

export default router;
