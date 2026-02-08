import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import sampleVideos from "../utils/sampleVideos";
import UploadVideoForm from "../components/UploadVideoForm";

function Channel() {
  const { user } = useContext(AuthContext);

  const [videos, setVideos] = useState(
    sampleVideos.filter((v) => v.channelId === user.channelId)
  );

  const addVideo = (video) => {
    const newVideo = {
      ...video,
      channelId: user.channelId,
      channel: user.channelName,
    };

    setVideos([newVideo, ...videos]);
  };

  const deleteVideo = (id) => {
    setVideos(videos.filter((v) => v.videoId !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">{user.channelName}</h1>
      <p className="text-gray-600 mb-6">Manage your videos</p>

      {/* Upload */}
      <UploadVideoForm onAdd={addVideo} />

      {/* My Videos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.videoId} className="border rounded p-3">
            <img
              src={video.thumbnail}
              alt=""
              className="rounded mb-2"
            />

            <h3 className="font-medium text-sm">{video.title}</h3>

            <button
              onClick={() => deleteVideo(video.videoId)}
              className="mt-2 text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-500">No videos uploaded yet</p>
        )}
      </div>
    </div>
  );
}

export default Channel;
