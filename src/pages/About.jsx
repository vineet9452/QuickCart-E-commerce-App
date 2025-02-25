import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container my-5 py-5">
        <div className="row align-items-center">
          {/* Left Section - Image */}
          <div className="col-md-6 text-center">
            <img
              src="/images/about.jpeg"
              alt="About Us"
              className="img-fluid rounded shadow-lg"
            />
          </div>

          {/* Right Section - Text */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-4">About Our Ecommerce Store</h1>
            <p className="text-muted fs-5">
              Welcome to our E-commerce platform, where we provide high-quality products with
              amazing discounts. Our mission is to bring the best shopping experience to our
              customers with top-notch customer service.
            </p>
            <p className="text-muted fs-5">
              Whether you're looking for the latest fashion, electronics, or daily essentials,
              we have everything you need. Join us and start your shopping journey today!
            </p>

            {/* Call to Action with Link */}
            <Link to="/contact" className="btn btn-primary btn-lg mt-3">Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
