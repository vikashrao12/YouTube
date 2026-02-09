import Comment from "../models/Comment.js";

// Get all comments for a video
export const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId })
      .populate("user", "username avatar") // show username & avatar
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { userId, text } = req.body;

    const newComment = new Comment({
      video: videoId,
      user: userId,
      text,
    });

    await newComment.save();

    const populatedComment = await newComment.populate("user", "username avatar");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

  
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

  
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } 
  catch (err) {
    console.log("DELETE COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};