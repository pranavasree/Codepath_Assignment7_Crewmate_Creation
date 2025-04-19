// src/components/Layout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded transition-all ${
      location.pathname === path
        ? "bg-blue-700 text-black font-semibold"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 p-6 flex flex-col justify-between shadow-lg fixed h-full">
        <div>
          <h1 className="text-2xl font-extrabold mb-8 text-gray-200">
            🚀 Crewmate Creator
          </h1>
          <nav className="flex flex-col gap-4">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/add" className={navLinkClass("/add")}>
              Create a Crewmate!
            </Link>
            <Link to="/gallery" className={navLinkClass("/gallery")}>
              Crewmate Gallery
            </Link>
          </nav>
        </div>

        <div className="text-sm text-gray-400 mt-8">
          🛸 Made with React + Supabase
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[20%] w-[80%] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
