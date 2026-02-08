import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  const hasChannel = user?.channelId;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p>
          <span className="font-medium">Username:</span> {user?.username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user?.email}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        {!hasChannel ? (
          <Link
            to="/create-channel"
            className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Create Channel
          </Link>

        ) : (
          <Link
            to={`/channel/${user.channelId}`}
            className="px-4 py-2 bg-gray-800 text-white rounded"
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
