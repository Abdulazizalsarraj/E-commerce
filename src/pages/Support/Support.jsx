import React from "react";
import { Link } from "react-router-dom";

const SupportPage = () => {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Support</h1>
        <p className="mt-6 text-lg">
          We're here to help! If you have any questions, issues, or need assistance, please reach out to us through the following channels.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Contact Information</h2>
        <p className="mt-4 text-lg">
          You can contact our support team via email at <strong>support@example.com</strong> or by phone at <strong>+1 (123) 456-7890</strong>.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Live Chat</h2>
        <p className="mt-4 text-lg">
          Our live chat support is available 24/7. Click the chat icon in the bottom right corner to start a conversation with one of our agents.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">FAQs</h2>
        <p className="mt-4 text-lg">
          Check out our <Link to="/faq" className="text-indigo-500 hover:underline">FAQ page</Link> for answers to common questions.
        </p>
      </div>
    );
  };
  
  export default SupportPage;