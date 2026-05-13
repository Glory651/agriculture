import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Makepayment = () => {
  const navigate = useNavigate()
  const { product, cart, total } = useLocation().state || {}

  const imagepath = "https://glorykifaru.alwaysdata.net/static/images/"

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Determine if single product or cart
  const isSingleProduct = !!product
  const items = isSingleProduct ? [product] : (cart || [])
  const amount = isSingleProduct ? product.product_cost : total

  // Prevent crash if page is refreshed or no product/cart passed
  if (items.length === 0) {
    return (
      <div className="text-center my-5">
        <h3 className="text-danger">No items to checkout</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    )
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    
    if (!phone) {
      setError("Please enter a phone number")
      return
    }

    setLoading("Processing payment...")
    setSuccess("")
    setError("")

    const formdata = new FormData()
    formdata.append("phone", phone)
    formdata.append("amount", amount)

    try {
      const response = await axios.post(
        "https://glorykifaru.alwaysdata.net/api/mpesa_payment",
        formdata
      )

      setSuccess(response.data.message || "✅ Payment initiated successfully!")
      setLoading("")
      
      // Clear cart after successful payment
      if (!isSingleProduct) {
        localStorage.removeItem("cart")
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }))
      }
      
      // Reset form
      setPhone("")
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Payment failed")
      setLoading("")
    }
  }

  return (
    <div className='container my-4'>
      <h1 className='text-center text-warning mb-4'>
        💳 Make Payment - Lipa Na Mpesa
      </h1>

      <div className='row justify-content-center'>
        <div className='col-md-8'>

          {/* ITEMS LIST */}
          <div className='card bg-dark text-white p-3 mb-3'>
            <h4 className='text-info mb-3'>Order Items:</h4>
            {items.map((item, idx) => (
              <div key={item.id || idx} className='d-flex justify-content-between mb-2 border-bottom pb-2'>
                <div>
                  <div className='text-info fw-bold'>{item.product_name}</div>
                  {!isSingleProduct && <small>Qty: {item.qty || 1}</small>}
                </div>
                <div className='text-warning'>
                  Ksh {isSingleProduct ? item.product_cost : (item.product_cost * (item.qty || 1)).toFixed(2)}
                </div>
              </div>
            ))}
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='text-success'>Total Amount:</h5>
              <h5 className='text-success fw-bold'>Ksh {amount}</h5>
            </div>
          </div>

          {/* PAYMENT FORM */}
          <div className='card shadow p-4 bg-dark'>

            {/* PRODUCT IMAGE (for single product) */}
            {isSingleProduct && (
              <img
                src={imagepath + product.product_photo}
                alt={product.product_name}
                style={{ height: 300, objectFit: "contain", marginBottom: 20 }}
              />
            )}

            <h4 className='text-warning mb-3'>{loading}</h4>
            <h4 className='text-success mb-3'>{success}</h4>
            <h4 className='text-danger mb-3'>{error}</h4>

            <form onSubmit={handlesubmit}>
              <label className='text-white mb-2'>Phone Number:</label>
              <input
                type="text"
                className='form-control mb-3'
                placeholder='Enter phone 254XXXXXXXXX'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <button 
                type='submit' 
                className='btn btn-success w-100'
                disabled={loading !== ""}
              >
                {loading ? "Processing..." : "Make Payment"}
              </button>
            </form>

            <button 
              className='btn btn-outline-secondary w-100 mt-2'
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Makepayment