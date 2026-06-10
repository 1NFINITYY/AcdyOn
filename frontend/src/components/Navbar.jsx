import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-white rounded-xl p-2 shadow">
              <span className="text-xl sm:text-2xl">
                🎓
              </span>
            </div>

            <h1 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
              Academic Pathway Engine
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className={`font-medium transition-all duration-300 ${
                location.pathname === "/"
                  ? "border-b-2 border-white pb-1 text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/submissions"
              className={`font-medium transition-all duration-300 ${
                location.pathname === "/submissions"
                  ? "border-b-2 border-white pb-1 text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              Submissions
            </Link>

            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-lg">
                👤
              </span>
            </div>

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden pb-4">

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`block px-5 py-4 ${
                  location.pathname === "/"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                🏠 Home
              </Link>

              <Link
                to="/submissions"
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`block px-5 py-4 border-t ${
                  location.pathname ===
                  "/submissions"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                📋 Submissions
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;