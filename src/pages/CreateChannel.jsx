import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      alert("Channel name required");
      return;
    }

    const channelId = "channel_" + Date.now();

    const updatedUser = {
      ...user,
      channelId,
      channelName,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Your Channel</h1>

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Channel Name"
          className="w-full border p-2 rounded"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

        <textarea
          placeholder="Channel Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
