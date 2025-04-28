// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, PlusSquare, User } from "lucide-react"; // using lucide icons

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* App Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Imagify
            </Link>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Home className="w-6 h-6 text-gray-900 hover:text-orange-500" />
            </Link>
            <Link to="/create-post">
              <PlusSquare className="w-6 h-6 text-gray-900 hover:text-orange-500" />
            </Link>
            <Link to="/profile">
              <User className="w-6 h-6 text-gray-900 hover:text-orange-500" />
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
