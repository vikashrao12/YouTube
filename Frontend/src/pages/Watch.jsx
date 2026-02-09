import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import CommentsSection from "../components/CommentsSection";

const API_URL = "http://localhost:3000/api/videos";

function Watch() {
  const { id } = useParams(); // MongoDB _id
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch video and increment views
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setVideo(res.data);

        // Increment views
        await axios.patch(`${API_URL}/${id}/views`);
        setVideo(prev => ({ ...prev, views: prev.views + 1 }));
      } catch (err) {
        console.error("Error fetching video:", err);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Fetch related videos
  useEffect(() => {
    if (!video) return;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(API_URL, {
          params: { category: video.category },
        });

        // Exclude current video
        const filtered = res.data.filter(v => v._id !== id).slice(0, 6);
        setRelatedVideos(filtered);
      } catch (err) {
        console.error("Error fetching related videos:", err);
        setRelatedVideos([]);
      }
    };

    fetchRelated();
  }, [video, id]);

  // Like video
  const handleLike = async () => {
    if (!liked) {
      await axios.patch(`${API_URL}/${id}/like`);
      setLiked(true);
      setDisliked(false);
      setVideo(prev => ({
        ...prev,
        likes: prev.likes + 1,
        dislikes: prev.dislikes - (disliked ? 1 : 0),
      }));
    }
  };

  // Dislike video
  const handleDislike = async () => {
    if (!disliked) {
      await axios.patch(`${API_URL}/${id}/dislike`);
      setDisliked(true);
      setLiked(false);
      setVideo(prev => ({
        ...prev,
        dislikes: prev.dislikes + 1,
        likes: prev.likes - (liked ? 1 : 0),
      }));
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* LEFT Video player */}
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
            <p className="text-sm text-gray-500">
              {video.views} views
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""
                }`}
            >
              <AiOutlineLike size={22} /> Like ({video.likes || 0})
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 ${disliked ? "text-red-600" : ""
                }`}
            >
              <AiOutlineDislike size={22} /> Dislike ({video.dislikes || 0})
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

      {/* RIGHT: Related Videos */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {relatedVideos.map(v => (
          <div key={v._id} className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img
              src={v.thumbnailUrl}
              alt={v.title}
              className="w-40 rounded-lg"
            />
            <div>
              <p className="text-sm font-medium line-clamp-2">{v.title}</p>
              <p className="text-xs text-gray-500">{v.channelName}</p>
              <p className="text-xs text-gray-500">{v.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watch;
