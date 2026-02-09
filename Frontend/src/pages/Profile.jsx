import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api/channels";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users channel from backend
  useEffect(() => {
    const fetchChannel = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${API_URL}/user/${user._id}`);

        setChannel(res.data);
      } catch (err) {
        console.log("No channel found for this user");
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [user]);

  if (!user) return <div className="p-4">Please login first</div>;
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p>
          <span className="font-medium">Username:</span> {user.username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        {!channel ? (
          <Link
            to="/create-channel"
            className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Create Channel
          </Link>
        ) : (
          <Link
            to={`/channel/${channel._id}`}
            className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Go to Your Channel
          </Link>
        )}

        <button
          onClick={logout}
          className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
