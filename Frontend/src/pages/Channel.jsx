import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UploadVideoForm from "../components/UploadVideoForm";
import axios from "axios";

const API_URL = "http://localhost:3000/api/channels";

function Channel() {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //  fetch video from backend
  useEffect(() => {
    if (!user?._id) return;

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/${user._id}/videos`
        );
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  //  add video
  const addVideo = (video) => {
    setVideos((prev) => [video, ...prev]);
  };

  //  delete video 
  const deleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await axios.delete(
        `${API_URL}/video/${videoId}`
      );
      setVideos((prev) =>
        prev.filter((v) => v._id !== videoId)
      );
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete video");
    }
  };

  if (loading) return <p className="p-6">Loading videos...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">
        {user.channelName}
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your videos
      </p>

      {/* Upload */}
      <UploadVideoForm onAdd={addVideo} />

      {/* Videos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="border rounded p-3"
          >
            <img
              src={video.thumbnailUrl}
              alt=""
              className="rounded mb-2"
            />

            <h3 className="font-medium text-sm">
              {video.title}
            </h3>

            <button
              onClick={() => deleteVideo(video._id)}
              className="mt-2 text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-500">
            No videos uploaded yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Channel;
