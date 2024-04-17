import express from "express";
import User from "../modals/userModal.js";
import Reel from "../modals/ReelModal.js";
import multer from "multer";
import Comment from "../modals/commentModal.js";
import { wrapper } from "../controllers/customError.js";
import isAuthenticated from "../controllers/userAuth.js";
import { cloudinary } from "../cloudConfig.js";
const upload = multer({
  storage: multer.diskStorage({}),
});
const router = express.Router();

router.get(
  "/search/:username",
  wrapper(async (req, res) => {
    let { username } = req.params;
    let result = await User.findOne({ $text: { $search: username } }).populate(
      "posts"
    );
    result.pwd ? (result.pwd = null) : "";
    await result.save();
    if (!result) return res.status(404).json({ message: "No user found" });
    res.status(200).send(result);
  })
);

router.post(
  "/reel/create",
  isAuthenticated,
  upload.single("clip"),
  wrapper(async (req, res) => {
    if (!req.file) return res.status(401).json({ message: "Something broke." });
    let reel;
    let user = await User.findOne({ _id: req.user.userId });
    await cloudinary.uploader
      .upload(req.file.path, {
        resource_type: "video",
        public_id: "clip",
      })
      .then((res) => {
        reel = new Reel();
        reel.video = res.url;
        reel.caption = req.body.caption;
        reel.author = req.user.userId;
        user.reels.push(reel);
      });

    await user.save();
    await reel.save();
    res.status(200).send(reel);
  })
);

router.get(
  "/reels",
  wrapper(async (req, res) => {
    let reels = await Reel.find().populate("comments").populate("likedBy");
    res.status(200).send(reels);
  })
);

export default router;
