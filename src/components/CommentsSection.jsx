import { useState } from "react";
import Comment from "./Comment";

function CommentsSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Vikash",
      text: "Bhai video mast hai 🔥",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Rahul",
      text: "Very helpful, thanks!",
      time: "1 day ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;

    setComments([
      {
        id: Date.now(),
        user: "You",
        text: newComment,
        time: "Just now",
      },
      ...comments,
    ]);

    setNewComment("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-4">
        {comments.length} Comments
      </h2>

      {/* Add Comment */}
      <div className="flex gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
          Y
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border-b outline-none py-1"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setNewComment("")}
              className="px-3 py-1 text-sm hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={addComment}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}

export default CommentsSection;
