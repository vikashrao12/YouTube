import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Channel() {
  const { user } = useContext(AuthContext);

  const [videos, setVideos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        {user?.channelName || "My Channel"}
      </h1>

      <p className="text-gray-600 mb-4">
        Manage your videos
      </p>

      <button
        onClick={() => setShowUpload(true)}
        className="mb-6 px-4 py-2 bg-black text-white rounded"
      >
        Upload Video
      </button>

      {showUpload && (
        <UploadVideo
          videos={videos}
          setVideos={setVideos}
          close={() => setShowUpload(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.length === 0 && (
          <p className="text-gray-500">No videos uploaded yet</p>
        )}

        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onDelete={(id) =>
              setVideos(videos.filter((v) => v.id !== id))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Channel;
