import { useState } from "react";

function UploadVideoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      alert("Title and Video URL required");
      return;
    }

    onAdd({
      videoId: "video_" + Date.now(),
      title,
      thumbnail,
      videoUrl,
      views: 0,
      category: "General",
    });

    setTitle("");
    setThumbnail("");
    setVideoUrl("");
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

      <button className="bg-black text-white px-4 py-2 rounded">
        Upload Video
      </button>
    </form>
  );
}

export default UploadVideoForm;
