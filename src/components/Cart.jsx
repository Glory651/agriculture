import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://glorykifaru.alwaysdata.net/static/images/";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      try {
        const data = JSON.parse(localStorage.getItem("cart") || "[]");
        console.log("Cart loaded from localStorage:", data);
        setCart(data);
      } catch (err) {
        console.error("Error loading cart:", err);
        setCart([]);
      }
    };

    loadCart();

    const handleCartUpdated = (e) => {
      console.log("cartUpdated event received:", e.detail);
      setCart(e.detail || []);
    };

    const handleStorageChange = (e) => {
      console.log("storage event received, key:", e?.key);
      if (!e || e.key === "cart") {
        loadCart();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateQty = (idx, newQty) => {
    if (newQty < 1) return;
    const updated = [...cart];
    updated[idx].qty = newQty;
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const removeFromCart = (idx) => {
    const updated = cart.filter((_, i) => i !== idx);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: updated }));
    setCart(updated);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));
    setCart([]);
  };

  // CALCULATE TOTAL HERE (BEFORE proceedToCheckout)
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.product_cost || 0) || 0;
    const qty = item.qty || 1;
    return sum + price * qty;
  }, 0);

  // PROCEED TO CHECKOUT
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("❌ Your cart is empty!");
      return;
    }
    
    console.log("Proceeding to checkout with total:", total);
    navigate("/makepayment", { 
      state: { 
        cart: cart, 
        total: total 
      } 
    });
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-warning">🛒 Your Cart is Empty</h2>
        <p className="text-secondary mt-3">Add products to get started</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-warning mb-4">🛒 Shopping Cart ({cart.length} items)</h2>

      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr className="text-info">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => {
              const itemTotal =
                (parseFloat(item.product_cost || 0) || 0) * (item.qty || 1);
              return (
                <tr key={item.id || idx}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          item.product_photo
                            ? IMAGE_BASE + item.product_photo
                            : ""
                        }
                        alt={item.product_name}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          marginRight: 10,
                        }}
                      />
                      <div>
                        <div className="text-info fw-bold">
                          {item.product_name}
                        </div>
                        <small className="text-secondary">
                          {item.product_description}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="text-warning">
                    Ksh {parseFloat(item.product_cost || 0).toFixed(2)}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(idx, (item.qty || 1) - 1)}
                      >
                        −
                      </button>
                      <span className="px-2 fw-bold">{item.qty || 1}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(idx, (item.qty || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-success fw-bold">
                    Ksh {itemTotal.toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(idx)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="card bg-dark border-info p-3">
            <h5 className="text-info mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between text-warning mb-2">
              <span>Subtotal:</span>
              <span>Ksh {total.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-warning mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between text-success fw-bold mb-3">
              <span>Total:</span>
              <span>Ksh {total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
            <button
              className="btn btn-outline-danger w-100 mb-2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;