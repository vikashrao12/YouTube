import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children, searchText, setSearchText }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Header
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <Sidebar isOpen={isSidebarOpen} />

      <main
        className={`pt-16 transition-all ${isSidebarOpen ? "ml-60" : "ml-20"
          }`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
