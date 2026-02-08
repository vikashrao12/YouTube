import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import { getAllVideos } from "../api/videoApi";



function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getAllVideos();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    return (
      selectedCategory === "All" ||
      video.category === selectedCategory
    );
  });


  return (
    <>
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </>
  );
}

export default Home;
