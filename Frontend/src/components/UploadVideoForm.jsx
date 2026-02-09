import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const VIDEO_API = "http://localhost:3000/api/videos";
const CHANNEL_API = "http://localhost:3000/api/channels/user";

function UploadVideoForm({ onAdd }) {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  // 🔥 fetch channel by logged-in user
  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`${CHANNEL_API}/${user._id}`)
      .then((res) => setChannel(res.data))
      .catch(() => setChannel(null));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("Please login first");
      return;
    }

    if (!channel) {
      alert("Please create a channel before uploading videos");
      return;
    }

    if (!title.trim() || !thumbnail.trim()) {
      alert("Title and thumbnail required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(VIDEO_API, {
        title: title.trim(),
        thumbnailUrl: thumbnail.trim(),
        description,
        category,
        channelName: channel.name,   //  from DB
        uploader: user._id,
      });

      onAdd && onAdd(res.data.video);

      setTitle("");
      setThumbnail("");
      setDescription("");
      setCategory("General");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Video upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        className="w-full border p-2 rounded"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Coding">Coding</option>
        <option value="Music">Music</option>
        <option value="Gaming">Gaming</option>
        <option value="Education">Education</option>
      </select>

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default UploadVideoForm;
