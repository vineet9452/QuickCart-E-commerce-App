import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <>
      {/* ✅ Header */}
      <header>
        <Header />
      </header>

      {/* ✅ Main Content Area */}
      <main className="container-fluid d-flex flex-column align-items-center justify-content-center" 
        style={{ minHeight: "70vh", padding: "20px", backgroundColor: "#f8f9fa" }}
      >
        <Toaster />
        {children}
      </main>

      {/* ✅ Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
