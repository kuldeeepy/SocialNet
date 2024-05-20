import User from "../modals/userModal.js";
import Reel from "../modals/reelModal.js";

const serachUser = async (req, res, next) => {
  try {
    let { username } = req.params;
    let result = await User.findOne({ $text: { $search: username } }).populate(
      "posts"
    );
    if (!result) return res.status(404).json({ message: "No user found" });
    result.pwd = null;
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const uploadReel = async (req, res, next) => {
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
};

const getReels = async (req, res, next) => {
  let reels = await Reel.find().populate("comments").populate("likedBy");
  res.status(200).send(reels);
};

export { serachUser, uploadReel, getReels };
