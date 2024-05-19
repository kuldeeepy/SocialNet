import express from "express";
const router = express.Router();
import multer from "multer";
import isAuthenticated from "../middlewares/authHandler.js";
const upload = multer({
  storage: multer.diskStorage({}),
});
// import { cloudinary } from "../cloudConfig.js";
import {
  serachUser,
  uploadReel,
  getReels,
} from "../controllers/generalController.js";

router.get("/search/:username", serachUser);
router.post("/reel/create", isAuthenticated, upload.single("clip"), uploadReel);
router.get("/reels", getReels);

export default router;
