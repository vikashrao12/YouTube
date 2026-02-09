import express from "express";
import {
  createChannel,
  getUserVideos,
  deleteVideo,
  getChannelByUser
} from "../controllers/channelController.js";

const router = express.Router();


router.post("/", createChannel);
router.get("/user/:userId", getChannelByUser);
router.get("/:userId/videos", getUserVideos);



router.delete("/video/:videoId", deleteVideo);

export default router;
