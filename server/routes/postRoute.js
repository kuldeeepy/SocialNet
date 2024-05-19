import express from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../cloudConfig.js";
import isAuthenticated from "../middlewares/authHandler.js";
const upload = multer({ storage });
import {
  getPosts,
  uploadPost,
  postLike,
} from "../controllers/postController.js";

router.get("/feed", getPosts);
router.post("/post", isAuthenticated, upload.single("image"), uploadPost);
router.patch("/:postId/like", postLike);

export default router;
