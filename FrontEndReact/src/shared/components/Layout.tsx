import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
   <div className="max-w-3xl mx-auto p-4">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
