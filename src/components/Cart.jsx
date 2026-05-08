import React, { useEffect, useState } from "react";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  // Load cart items
  useEffect(() => {

    const items =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(items);

  }, []);

  return (
    <div className="container mt-4">

      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            className="card p-3 mb-3"
          >
            <h4>{item.product_name}</h4>

            <p>
              Price: KES {item.product_cost}
            </p>
          </div>
        ))
      )}

    </div>
  );
};

export default Cart;