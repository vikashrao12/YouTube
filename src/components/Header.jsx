import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function Header({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white sticky top-0 z-50">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <FaBars className="text-xl cursor-pointer" />
        <Link to="/" className="text-xl font-bold text-red-600">
          YouTube
        </Link>
      </div>

      {/* Middle Section  Search */}
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-l-full focus:outline-none"
        />
        <button className="px-4 py-2 border rounded-r-full bg-gray-100">
          <FaSearch />
        </button>
      </div>

      {/* Right Section */}
      <div>
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 border rounded-full text-blue-600 font-medium"
        >
          <FaBars
            className="text-xl cursor-pointer"
            onClick={onMenuClick}
          />
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
