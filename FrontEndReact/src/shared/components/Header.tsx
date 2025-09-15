import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-gray-200">
      <nav className="flex flex-col items-center gap-4">
        {/* App title */}
        <div className="text-xl font-bold tracking-wide">1Breadcrumb</div>

        {/* Nav links */}
        <div className="flex flex-row gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
        
          <Link to="/books" className="hover:text-blue-600 transition">
            Books
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
