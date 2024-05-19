import User from "../modals/userModal.js";
import Post from "../modals/postModal.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

const getPosts = async (req, res, next) => {
  let posts = await Post.find()
    .populate("author")
    .populate("likedBy")
    .sort({ postedAt: -1 });
  res.status(200).send(posts);
};

const uploadPost = async (req, res, next) => {
  let { caption, image } = req.body;
  if (!(caption || image))
    return res.status(401).json({ message: "Please provide all details." });
  let post = new Post(req.body);
  post.image = req.file.path;
  post.author = req.user;

  let user = await User.findOne({ _id: req.user });
  user.posts.push(post);
  await user.save();

  await post.save();
  res.status(200).send(req.file);
};

const postLike = async (req, res, next) => {
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
};

export { getPosts, uploadPost, postLike };
