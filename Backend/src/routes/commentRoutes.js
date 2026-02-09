import express from "express";
import { getCommentsByVideo, addComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:videoId", getCommentsByVideo);
router.post("/:videoId", addComment);

export default router;
