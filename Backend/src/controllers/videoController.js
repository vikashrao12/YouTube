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
