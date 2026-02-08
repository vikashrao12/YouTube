import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.videoId}`}>
      <div className="cursor-pointer">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="rounded-xl w-full"
        />

        <div className="mt-2">
          <h3 className="font-medium text-sm line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-500">{video.channel}</p>
          <p className="text-xs text-gray-500">
            {video.views} views • {video.time}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
