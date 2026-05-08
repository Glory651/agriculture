// Getproduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const Getproduct = () => {
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch products from API
  const getProducts = async () => {
    setLoading("Please wait...");
    setError("");
    try {
      const response = await axios.get(
        "https://glorykifaru.alwaysdata.net/api/getproducts"
      );
      setProducts(response.data || []);
      setLoading("");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setLoading("");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const imagePath = "https://glorykifaru.alwaysdata.net/static/images/";

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Carousel */}
        <Carousel />

        <h1 className="text-center my-3">Available Products</h1>

        {/* Search bar */}
        <div className="row justify-content-center mb-3">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading/Error Messages */}
        {loading && <h2 className="text-warning text-center">{loading}</h2>}
        {error && <h2 className="text-danger text-center">{error}</h2>}

        {/* Product List */}
        <div className="row justify-content-center">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div className="col-md-3 mb-3" key={product.id}>
              <div className="card shadow h-100 w-100 bg-dark">
                <img
                  src={imagePath + product.product_photo}
                  alt={product.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                  className="card-img-top"
                />
                <div className="card-body bg-dark">
                  <h3 className="text-info">{product.product_name}</h3>
                  <p className="text-center text-white">
                    {product.product_description}
                  </p>
                  <b className="text-warning">Ksh {product.product_cost}</b>
                  <br />
                  <button
                    className="btn btn-info w-50 mt-2"
                    onClick={() =>
                      navigate("/makepayment", { state: { product } })
                    }
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center my-3">
            <button
              className="btn btn-primary"
              onClick={() => setVisibleCount(visibleCount + 8)}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Getproduct;