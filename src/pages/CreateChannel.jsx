import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    console.log({ channelName, description });

    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-xl font-semibold mb-4">Create Channel</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Channel Name"
          className="w-full border p-2 rounded"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
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
