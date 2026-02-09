import express from "express";
import { getAllVideos,getVideoById,incrementViews,likeVideo,dislikeVideo } from "../controllers/videoController.js";


const router = express.Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById); 
router.patch("/:id/views", incrementViews);
router.patch("/:id/like", likeVideo);
router.patch("/:id/dislike", dislikeVideo);

export default router;
