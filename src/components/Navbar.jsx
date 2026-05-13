import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    const updateCount = () => {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = c.reduce((s, it) => s + (it.qty || 0), 0);
      setCount(totalQty);
    };

    updateCount();

    // Listen for cart updates
    const onCartUpdated = () => updateCount();
    window.addEventListener("cartUpdated", onCartUpdated);

    // Listen for login/logout custom events
    const onLoginStatusChanged = () => {
      checkLogin();
    };
    window.addEventListener("loginStatusChanged", onLoginStatusChanged);

    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("loginStatusChanged", onLoginStatusChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setIsLoggedIn(false);
    setCount(0);
    // Dispatch event to refresh other components
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate("/Signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🌾 Gakii Kifaru
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                📦 Products
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {/* CART LINK - ONLY VISIBLE WHEN LOGGED IN */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  🛒 Cart
                  {count > 0 && (
                    <span
                      className="badge bg-danger rounded-circle"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 0,
                      }}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* LOGIN/LOGOUT BUTTONS */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signin">
                    🔐 Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">
                    ✍️ Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-decoration-none"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  🚪 Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;