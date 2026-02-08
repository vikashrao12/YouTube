import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Header({ onMenuClick, searchText, setSearchText }) {

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white fixed top-0 w-full z-50">

      {/* Left */}
      <div className="flex items-center gap-4">
        <FaBars
          className="text-xl cursor-pointer"
          onClick={onMenuClick}
        />
        <Link to="/" className="text-xl font-bold text-red-600">
          YouTube
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border rounded-l-full focus:outline-none"
        />
        <button className="px-4 py-2 border rounded-r-full bg-gray-100">
          <FaSearch />
        </button>
      </div>

      {/* Right */}


      {user ? (
        <button onClick={logout} className="font-medium">
          {user.username}
        </button>
      ) : (
        <Link to="/login" className="font-medium">
          Sign In
        </Link>
      )}

    </header>
  );
}

export default Header;
