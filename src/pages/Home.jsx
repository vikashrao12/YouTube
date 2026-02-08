import { useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import sampleVideos from "../utils/sampleVideos";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filteredVideos = sampleVideos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;

    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Layout searchText={searchText} setSearchText={setSearchText}>
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
