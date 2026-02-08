import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-60 bg-white border-r pt-16 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav className="flex flex-col gap-4 p-4 text-sm">
        <Link to="/" className="font-medium hover:bg-gray-100 p-2 rounded">
          Home
        </Link>
        <Link className="hover:bg-gray-100 p-2 rounded">
          Shorts
        </Link>
        <Link className="hover:bg-gray-100 p-2 rounded">
          Subscriptions
        </Link>
        <Link className="hover:bg-gray-100 p-2 rounded">
          Library
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
