import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navagate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      username: "Vikash",
      email,
    });
    navagate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border p-6 rounded"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign In
        </button>

        <p className="text-sm text-center mt-3">
          New user?
          <Link to="/register" className="text-blue-600 ml-1">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
