import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions, MdVideoLibrary } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

function Sidebar({ isOpen }) {
  const menuItems = [
    { name: "Home", icon: <IoMdHome size={22} />, path: "/" },
    { name: "Shorts", icon: <SiYoutubeshorts size={22} /> },
    { name: "Subscriptions", icon: <MdSubscriptions size={22} /> },
    { name: "Library", icon: <MdVideoLibrary size={22} /> }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r pt-16
      transition-all duration-300
      ${isOpen ? "w-60" : "w-20"}`}
    >
      <nav className="flex flex-col gap-2 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-100"
          >
            {/* Icon */}
            <span className="text-xl">{item.icon}</span>

            {/* Text (only when open) */}
            {isOpen && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
