import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="container my-5 py-5">
        <h1 className="text-center text-primary fw-bold">📞 Contact Us</h1>
        <p className="text-muted text-center fs-5">
          Have any queries? Feel free to reach out to us 24/7!
        </p>
        <div className="row align-items-center">

          {/* Left Section - Image */}
          <div className="col-md-6 text-center">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="img-fluid rounded shadow-lg"
            />
          </div>

          {/* Right Section - Contact Info */}
          <div className="col-md-6">


            <div className="mt-4">
              <p className="fs-5">
                <BiMailSend className="text-danger fs-4 me-2" />
                <strong>Email:</strong> support@ecommerceapp.com
              </p>
              <p className="fs-5">
                <BiPhoneCall className="text-success fs-4 me-2" />
                <strong>Phone:</strong> +91-9876543210
              </p>
              <p className="fs-5">
                <BiSupport className="text-warning fs-4 me-2" />
                <strong>Customer Support:</strong> 1800-0000-0000 (Toll-Free)
              </p>
            </div>

            {/* Contact Form */}
            <div className="mt-5">
              <h4 className="text-center text-dark">📩 Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="3" placeholder="Your Message"></textarea>
                </div>
                <button className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Contact;
