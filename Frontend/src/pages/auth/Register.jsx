import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register Data:", formData);

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border p-6 rounded"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
