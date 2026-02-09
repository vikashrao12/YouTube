import express from "express";
import { getAllVideos,getVideoById,incrementViews,likeVideo,dislikeVideo,createVideo } from "../controllers/videoController.js";


const router = express.Router();

router.post("/", createVideo);

router.get("/", getAllVideos);
router.get("/:id", getVideoById); 
router.patch("/:id/views", incrementViews);
router.patch("/:id/like", likeVideo);
router.patch("/:id/dislike", dislikeVideo);

export default router;
