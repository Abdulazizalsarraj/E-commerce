import React from "react";

const ShippingDeliveryPage = () => {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Shipping & Delivery</h1>
        <p className="mt-6 text-lg">
          We offer fast and reliable shipping options to ensure your orders arrive on time. Below are the details of our shipping and delivery process.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Shipping Options</h2>
        <p className="mt-4 text-lg">
          We provide standard and express shipping options. Standard shipping takes 5-7 business days, while express shipping delivers within 2-3 business days.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Tracking Your Order</h2>
        <p className="mt-4 text-lg">
          Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's site.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">International Shipping</h2>
        <p className="mt-4 text-lg">
          We ship internationally! Delivery times vary by location, and additional customs fees may apply. Please check your country's import policies for more details.
        </p>
      </div>
    );
  };
  
  export default ShippingDeliveryPage;