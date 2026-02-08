import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import sampleVideos from "../utils/sampleVideos";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import CommentsSection from "../components/CommentsSection";


function Watch() {
  const { id } = useParams();
  const video = sampleVideos.find((v) => v.videoId === id);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  if (!video) return <div>Video not found</div>;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6 p-4">

        {/* LEFT Video Player */}
        <div className="flex-1">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full rounded-xl"
          />

          {/* Title */}
          <h1 className="mt-4 text-lg font-semibold">
            {video.title}
          </h1>

          {/* Channel  Actions */}
          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="font-medium">{video.channel}</p>
              <p className="text-sm text-gray-500">
                {video.subscribers} subscribers
              </p>
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
        </div>
        <CommentsSection videoId={id} />


        {/*  Related Videos */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {sampleVideos
            .filter((v) => v.videoId !== id)
            .slice(0, 6)
            .map((v) => (
              <div key={v.videoId} className="flex gap-3">
                <img
                  src={v.thumbnail}
                  className="w-40 rounded-lg"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-2">
                    {v.title}
                  </p>
                  <p className="text-xs text-gray-500">{v.channel}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Watch;
