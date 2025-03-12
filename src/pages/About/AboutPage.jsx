import React from 'react';
import { useOutletContext } from 'react-router-dom';

const AboutPage = () => {

  const { darkMode } = useOutletContext();

  return (
    <div className="p-6 max-w-3xl mx-auto">
  
      <h1 className="text-4xl font-extrabold text-center">About Us</h1>
      
      <div className="space-y-6">
    
        <p className="mt-6 text-l">
          Welcome to My Shop, a passionate e-commerce platform dedicated to providing high-quality products and excellent customer service. We strive to offer a seamless online shopping experience for everyone.
        </p>
        

        <h2 className="mt-8 text-2xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-lg ">
          Our mission is to make shopping online easy, enjoyable, and secure for everyone. Whether you're looking for the latest trends, must-have gadgets, or timeless classics, we've got you covered.
        </p>
        

        <h2 className="mt-8 text-2xl font-semibold ">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Wide range of products</li>
          <li>Fast and reliable shipping</li>
          <li>24/7 customer support</li>
          <li>Secure payment options</li>
        </ul>
        
    
        <h2 className="mt-8 text-2xl font-semibold">Our Values</h2>
        <p className="mt-4 text-lg ">
          We are committed to providing our customers with the best shopping experience. We believe in transparency, integrity, and delivering on our promises.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
