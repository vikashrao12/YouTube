import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/channels";

function CreateChannel() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, {
        name,
        description,
        owner: user.id,
      });
      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Your Channel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Channel Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
