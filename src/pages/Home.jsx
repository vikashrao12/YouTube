import { useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import sampleVideos from "../utils/sampleVideos";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? sampleVideos
      : sampleVideos.filter(
        (video) => video.category === selectedCategory
      );

  return (
    <Layout>
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </Layout>
  );
}

export default Home;
