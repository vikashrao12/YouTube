import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import CommentsSection from "../components/CommentsSection";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:3000/api/videos";

function Watch() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setVideo(res.data);

        await axios.patch(`${API_URL}/${id}/views`);
        setVideo((p) => ({ ...p, views: p.views + 1 }));
      } catch {
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);


  // related videos
  useEffect(() => {
    if (!video) return;
    axios
      .get(API_URL, { params: { category: video.category } })
      .then((res) =>
        setRelatedVideos(res.data.filter((v) => v._id !== id).slice(0, 6))
      );
  }, [video, id]);

  const handleLike = async () => {
    if (liked) return;
    await axios.patch(`${API_URL}/${id}/like`);
    setLiked(true);
    setDisliked(false);
    setVideo((p) => ({
      ...p,
      likes: p.likes + 1,
      dislikes: p.dislikes - (disliked ? 1 : 0),
    }));
  };

  const handleDislike = async () => {
    if (disliked) return;
    await axios.patch(`${API_URL}/${id}/dislike`);
    setDisliked(true);
    setLiked(false);
    setVideo((p) => ({
      ...p,
      dislikes: p.dislikes + 1,
      likes: p.likes - (liked ? 1 : 0),
    }));
  };

  const handleSubscribe = () => {
    if (!user) {
      alert("Login to subscribe");
      return;
    }
    setSubscribed(!subscribed);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-4">

      <div className="flex-1">

        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />


          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 p-5 rounded-full">
              <FaPlay className="text-white text-2xl ml-1" />
            </div>
          </div>
        </div>

        {/* title */}
        <h1 className="mt-4 text-xl font-semibold">
          {video.title}
        </h1>


        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold">
              {video.channelName?.charAt(0)}
            </div>

            <div>
              <p className="font-medium">{video.channelName}</p>
              <p className="text-sm text-gray-500">
                {video.views} views
              </p>
            </div>

            <button
              onClick={handleSubscribe}
              className={`ml-4 px-5 py-2 rounded-full text-sm font-medium
                ${subscribed
                  ? "bg-gray-200 text-black"
                  : "bg-black text-white"
                }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""}`}
            >
              <AiOutlineLike size={22} /> {video.likes || 0}
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 ${disliked ? "text-red-600" : ""}`}
            >
              <AiOutlineDislike size={22} /> {video.dislikes || 0}
            </button>
          </div>
        </div>

        {/* description */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm">
          {video.description}
        </div>

        {/* comments */}
        <CommentsSection videoId={id} />
      </div>

      {/* right */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {relatedVideos.map((v) => (
          <div
            key={v._id}
            className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <img
              src={v.thumbnailUrl}
              alt={v.title}
              className="w-40 h-24 object-cover rounded-lg"
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
