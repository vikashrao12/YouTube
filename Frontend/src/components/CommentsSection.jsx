import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function CommentsSection({ videoId }) {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  //  fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comments/${videoId}`
        );
        setComments(res.data);
      } catch (err) {
        console.log("Error fetching comments", err);
      }
    };

    if (videoId) fetchComments();
  }, [videoId]);

  //  add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/comments/${videoId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setComments((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.log("Error adding comment", err);
    }
  };

  //  delete comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setComments((prev) =>
        prev.filter((c) => c._id !== commentId)
      );
      setOpenMenu(null);
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h3>

      {/* Add Comment */}
      {user ? (
        <form
          onSubmit={handleAddComment}
          className="flex gap-2 mb-6"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded"
          >
            Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Please login to comment.
        </p>
      )}

      {/*  Comments List */}
      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="flex gap-3 items-start relative"
          >

            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
              {c.user?.username?.charAt(0)?.toUpperCase()}
            </div>

            {/* content */}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {c.user?.username}
              </p>
              <p className="text-sm text-gray-700">
                {c.text}
              </p>
            </div>

            {/*  3 dot */}
            {user?._id === c.user?._id && (
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === c._id ? null : c._id
                    )
                  }
                  className="text-xl px-2 cursor-pointer"
                >
                  ⋮
                </button>

                {openMenu === c._id && (
                  <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
