import React from "react";
import { Link } from "react-router-dom";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <h5 className="fw-bold">Ecommerce Store &copy; {new Date().getFullYear()}</h5>

        <div className="mt-3">
          <Link to="/about" className="text-light mx-3 text-decoration-none">About</Link>|
          <Link to="/contact" className="text-light mx-3 text-decoration-none">Contact</Link>|
          <Link to="/policy" className="text-light mx-3 text-decoration-none">Privacy Policy</Link>
        </div>

        {/* Social Media Icons */}
        <div className="mt-3">
          <a href="https://facebook.com" target="_blank" className="text-light mx-2">
            <FacebookOutlined className="fs-4" />
          </a>
          <a href="https://twitter.com" target="_blank" className="text-light mx-2">
            <TwitterOutlined className="fs-4" />
          </a>
          <a href="https://instagram.com" target="_blank" className="text-light mx-2">
            <InstagramOutlined className="fs-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-light mx-2">
            <LinkedinOutlined className="fs-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
