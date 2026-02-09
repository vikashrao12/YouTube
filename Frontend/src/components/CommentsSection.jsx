import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function CommentsSection({ videoId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");


  useEffect(() => {

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments(); // call the async function
  }, [videoId]); // dependency array

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(`http://localhost:3000/api/comments/${videoId}`, {
        userId: user.id,
        text,
      });

      // Add new comment to state
      setComments([res.data, ...comments]);
      setText("");
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>

      {/* Add Comment */}
      {user ? (
        <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 rounded" type="submit">
            Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">Sign in to add a comment.</p>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-3">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-3 items-start">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {c.user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{c.user?.username}</p>
              <p className="text-sm text-gray-700">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
