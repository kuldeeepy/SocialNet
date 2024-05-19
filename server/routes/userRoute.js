import express from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });
import {
  signup,
  login,
  profile,
  updateDp,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/authHandler.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile/:username", isAuthenticated, profile);
router.patch("/:id/edit", upload.single("image"), updateDp);

export default router;
