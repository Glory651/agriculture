import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    setUser(loggeduser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-md bg-light px-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "10px",
            }}
          >
            {/* Left Side */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <p style={{ margin: 0 }}>Waste-to-Wealth</p>
              <Link to="/Home">Home</Link>
              <Link to="/">Get Products</Link>
              <Link to="/addproduct">Add Product</Link>
            </div>

            {/* Right Side */}
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              {user ? (
                <>
                  <span className="nav-link">Welcome {user.username}</span>
                  <button onClick={logout} className="btn btn-info">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/Signin">Signin</Link>
                  <Link to="/Signup">Signup</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;