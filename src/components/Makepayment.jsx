import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Makepayment = () => {
  const { product } = useLocation().state || {}

  const imagepath = "http://glorykifaru.alwaysdata.net/static/images/"

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // prevent crash if page is refreshed or no product passed
  if (!product) {
    return <h3 className="text-danger text-center">No product selected</h3>
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Just a min...")
    setSuccess("")
    setError("")

    const formdata = new FormData()
    formdata.append("phone", phone)
    formdata.append("amount", product.product_cost)

    try {
      const response = await axios.post(
        "http://glorykifaru.alwaysdata.net/api/mpesa_payment",
        formdata
      )

      setSuccess(response.data.message)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  return (
    <div className='row justify-content-center '>
      <h1 className='text-dark  text-center'>
        Make payment - Lipa Na Mpesa
      </h1>

      <div className='col-md-8 card shadow p-4 bg-dark'>

        <img
          src={imagepath + product.product_photo}
          alt={product.product_name}
          style={{ height: 500, objectFit: "contain" }}
        />

        <h5 className='text-white text-start'>
          {product.product_name}
        </h5>

        <p className='text-start'>
          {product.product_description}
        </p>

        <b className='text-white text-start'>
          Ksh {product.product_cost}
        </b>

        <br /><br />

        <h4 className='text-warning'>{loading}</h4>
        <h4 className='text-success'>{success}</h4>
        <h4 className='text-danger'>{error}</h4>

        <form onSubmit={handlesubmit}>
          <input
            type="number"
            className='form-control'
            placeholder='Enter phone 254XXXXXXXXX'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />

          <button type='submit' className='btn btn-info w-100'>
            Make payment
          </button>
        </form>

      </div>
    </div>
  )
}

export default Makepayment