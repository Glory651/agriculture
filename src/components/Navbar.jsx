import { Link, useNavigate } from "react-router-dom"


const Navbar = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem("user")


  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/signin")
  }

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

            {/* LEFT SIDE */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <p style={{ margin: 0 }}>Waste-to-Wealth</p>

              {/* PUBLIC ROUTES */}
              <Link to="/home">Home</Link>

              {/* PRIVATE ROUTES */}
              {user && (
                <>
                  <Link to="/getproducts">Get Products</Link>
                  <Link to="/addproduct">Add Product</Link>


                </>
              )}
            </div>

            {/* RIGHT SIDE */}
                <Link to="/cart" className="cart-link-btn">
              🛒 Cart 
              </Link>
            
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

              {user ? (
                <button onClick={handleLogout} className="btn btn-info">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/signin">Signin</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}

            </div>

          </div>

        </nav>
      </div>
    </section>
  )
}

export default Navbar