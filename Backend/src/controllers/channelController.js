import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { name, description, owner } = req.body;

    if (!name || !owner) {
      return res.status(400).json({ message: "Name and owner required" });
    }

    // 🔴 already exists check
    const existing = await Channel.findOne({ owner });
    if (existing) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    // 1️⃣ create channel
    const channel = await Channel.create({
      name,
      description,
      owner,
    });

    // 2️⃣ update user
    const user = await User.findById(owner);
    if (!user) {
      await Channel.findByIdAndDelete(channel._id); // rollback
      return res.status(400).json({ message: "User not found" });
    }

    user.channelName = channel.name;
    user.channelId = channel._id;
    await user.save();

    // ✅ ONLY SUCCESS RESPONSE
    return res.status(201).json({
      channel,
      user,
    });
  } catch (err) {
    console.error("CREATE CHANNEL ERROR:", err);
    return res.status(500).json({ message: "Failed to create channel" });
  }
};
// Get all videos 
export const getUserVideos = async (req, res) => {
  try {
    const { userId } = req.params;

    const videos = await Video.find({ uploader: userId }).sort({
      createdAt: -1,
    });

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// Delete a video by ID 
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });
;

    await Video.findByIdAndDelete(videoId);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete video" });
  }
};


export const getChannelByUser = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.params.userId });
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};