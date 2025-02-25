import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          <h1 className="text-center text-primary fw-bold">🔒 Privacy Policy</h1>
          <p className="text-muted text-center fs-5">
            We value your privacy and ensure the protection of your data.
          </p>
          {/* Left Section - Image */}
          <div className="col-md-6 text-center">
            <img
              src="/images/contactus.jpeg"
              alt="Privacy Policy"
              className="img-fluid rounded shadow-lg"
            />
          </div>

          {/* Right Section - Privacy Policy */}
          <div className="col-md-6">


            <div className="mt-4">
              <h5>📌 Personal Information:</h5>
              <p>
                We collect your name, email, contact number, and address only to process your orders and provide a better shopping experience.
              </p>

              <h5>📌 Data Protection:</h5>
              <p>
                Your personal information is securely stored and will never be shared with third parties without your consent.
              </p>

              <h5>📌 Cookies & Tracking:</h5>
              <p>
                Our website uses cookies to enhance user experience, track preferences, and provide personalized recommendations.
              </p>

              <h5>📌 Secure Payments:</h5>
              <p>
                We use encrypted and secure payment gateways to ensure safe transactions without storing any card details.
              </p>

              <h5>📌 Contact Us:</h5>
              <p>
                If you have any concerns regarding your privacy, feel free to <strong>contact us</strong> at <span className="text-primary">support@ecommerceapp.com</span>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Policy;


// < img src = alt = "" style = {{ width: "100%" }}/>
