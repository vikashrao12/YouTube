import express from "express";
import { getAllVideos } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById); 

export default router;
