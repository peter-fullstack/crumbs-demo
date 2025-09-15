import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 py-4">
      <div className="flex justify-center items-center">
        <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} Fullstack Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
