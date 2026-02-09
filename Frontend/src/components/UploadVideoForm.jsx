import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:3000/api/videos";

function UploadVideoForm({ onAdd }) {
  const { user } = useContext(AuthContext); // get logged-in user
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      alert("Title and Video URL required");
      return;
    }

    if (!user) {
      alert("You must be logged in to upload a video");
      return;
    }

    setLoading(true);

    try {
      // Send video data to backend
      const res = await axios.post(API_URL, {
        title,
        videoUrl,
        thumbnailUrl: thumbnail,
        category,
        description,
        channelName: user.username, // or user.channelName if you have
        uploader: user.id,
      });

      // Update parent component state
      onAdd(res.data.video);

      // Reset form
      setTitle("");
      setThumbnail("");
      setVideoUrl("");
      setDescription("");
      setCategory("General");
    } catch (err) {
      console.error("Video upload failed:", err);
      alert("Failed to upload video");
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

      <input
        className="w-full border p-2 rounded"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
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
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default UploadVideoForm;
