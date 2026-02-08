import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import sampleVideos from "../utils/sampleVideos";

function Home() {
  return (
    <Layout>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </Layout>
  );
}

export default Home;
