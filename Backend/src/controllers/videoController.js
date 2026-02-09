import Video from "../models/Video.js";

export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch videos" });
  }
};

export const getVideoById = async (req, res) => {
  try {
 
    const video = await Video.findById(req.params.id);

   

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video" });
  }
};


// Increment view count
export const incrementViews = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.views += 1;
    await video.save();

    res.status(200).json({ views: video.views });
  } catch (error) {
    res.status(500).json({ message: "Failed to increment views" });
  }
};

// Like video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1;
    await video.save();

    res.status(200).json({ likes: video.likes });
  } catch (error) {
    res.status(500).json({ message: "Failed to like video" });
  }
};

// Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes += 1;
    await video.save();

    res.status(200).json({ dislikes: video.dislikes });
  } catch (error) {
    res.status(500).json({ message: "Failed to dislike video" });
  }
};

