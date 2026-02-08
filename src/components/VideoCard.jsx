import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.videoId}`} className="cursor-pointer">
      <div className="w-full">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        <div className="mt-2">
          <h3 className="font-medium text-sm line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 text-xs mt-1">
            {video.channelName}
          </p>
          <p className="text-gray-600 text-xs">
            {video.views.toLocaleString()} views
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
