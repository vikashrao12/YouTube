import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import CommentsSection from "../components/CommentsSection";

const API_URL = "http://localhost:3000/api/videos";

function Watch() {
  const { id } = useParams(); // MongoDB _id
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Error fetching video:", err);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="flex-1">
        <video
          src={video.videoUrl}
          controls
          autoPlay
          className="w-full rounded-xl"
        />

        <h1 className="mt-4 text-lg font-semibold">{video.title}</h1>

        {/* Channel Actions */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="font-medium">{video.channelName}</p>
            <p className="text-sm text-gray-500">{video.views} views</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
              className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""
                }`}
            >
              <AiOutlineLike size={22} /> Like
            </button>

            <button
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
              className={`flex items-center gap-1 ${disliked ? "text-red-600" : ""
                }`}
            >
              <AiOutlineDislike size={22} /> Dislike
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm">
          <p>{video.description}</p>
        </div>

        {/* Comments */}
        <CommentsSection videoId={id} />
      </div>

      {/* Right Related Videos */}
      <div className="w-full lg:w-80 flex flex-col gap-4">

      </div>
    </div>
  );
}

export default Watch;
