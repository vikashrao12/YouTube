import express from "express";
import { getCommentsByVideo, addComment,deleteComment } from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/:videoId", getCommentsByVideo);
router.post("/:videoId", addComment);
router.delete("/:commentId",auth, deleteComment); 

export default router;
