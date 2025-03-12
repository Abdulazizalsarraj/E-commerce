
import React from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: '$10', quantity: 1 },
    { id: 2, name: 'Product 2', price: '$20', quantity: 2 },

  ];

  const handleQuantityChange = (id, quantity) => {
 
  };

  const handleRemoveItem = (id) => {
    
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="mt-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
            <div>
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                className="w-12 p-2 border rounded"
              />
              <button onClick={() => handleRemoveItem(item.id)} className="ml-2 text-red-500">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <h2 className="text-xl font-semibold">Total Price: ${totalPrice}</h2>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
