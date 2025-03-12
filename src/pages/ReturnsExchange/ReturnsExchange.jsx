import React from "react";

const ReturnsExchangePage = () => {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Returns & Exchanges</h1>
        <p className="mt-6 text-lg">
          We want you to be completely satisfied with your purchase. If you're not happy, we offer a hassle-free return and exchange policy.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Return Policy</h2>
        <p className="mt-4 text-lg">
          You can return any unused and unopened item within 30 days of purchase for a full refund. Please ensure the item is in its original packaging.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">Exchange Policy</h2>
        <p className="mt-4 text-lg">
          If you need a different size or color, we offer free exchanges within 30 days of purchase. Contact our support team to initiate an exchange.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold">How to Return</h2>
        <p className="mt-4 text-lg">
          To return an item, please follow these steps:
          <ol className="list-decimal list-inside mt-2">
            <li>Contact our support team to get a return authorization number.</li>
            <li>Package the item securely and include the return form.</li>
            <li>Ship the item to the address provided by our team.</li>
          </ol>
        </p>
      </div>
    );
  };
  
  export default ReturnsExchangePage;