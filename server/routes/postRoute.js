import express from "express";
import multer from "multer";
import Post from "../modals/postModal.js";
import User from "../modals/userModal.js";
import isAuthenticated from "../controllers/userAuth.js";
const router = express.Router();
import { storage } from "../cloudConfig.js";
import { wrapper } from "../controllers/customError.js";
const upload = multer({ storage });

router.get(
  "/feed",
  wrapper(async (req, res) => {
    let posts = await Post.find()
      .populate("author")
      .populate("likedBy")
      .sort({ postedAt: -1 });
    res.status(200).send(posts);
  })
);

router.post(
  "/post",
  isAuthenticated,
  upload.single("image"),
  wrapper(async (req, res) => {
    let { caption, image } = req.body;
    if (!(caption || image))
      return res.status(401).json({ message: "Please provide all details." });
    let post = new Post(req.body);
    post.image = req.file.path;
    post.author = req.user.userId;

    let user = await User.findOne({ _id: req.user.userId });
    user.posts.push(post);
    await user.save();

    await post.save();
    res.status(200).send(req.file);
  })
);

router.patch(
  "/:postId/like",
  wrapper(async (req, res) => {
    let isLiked;
    let { postId } = req.params;
    let { username } = req.body;
    if (!postId || !username)
      return res
        .status(400)
        .json({ message: "PostId and username are required" });

    let user = await User.findOne({ uname: username });
    let post = await Post.findOne({ _id: postId });

    if (!user || !post)
      return res.status(400).json({ message: "Something broke" });

    // Check if user already liked the post
    const userExists = post.likedBy.some((likedUser) =>
      likedUser._id.equals(user._id)
    );

    if (userExists) {
      // Remove user from likedBy array
      post.likedBy = post.likedBy.filter(
        (likedUser) => !likedUser._id.equals(user._id)
      );
      isLiked = 0;
    } else {
      // Add user to likedBy array
      isLiked = 1;
      post.likedBy.push(user);
    }

    // Save the updated post
    await post.save();
    res.status(200).json({ like: isLiked });
  })
);

export default router;
