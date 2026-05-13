import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    let navigate = useNavigate();

  // declare the states here
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // define the states for hosting data
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // function to handle submit 
  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("please wait ...")
    setError("")
    setSuccess("")

    // create a empty digital envelope 
    const formdata = new FormData ()
    formdata.append("email", email)
    formdata.append("password", password)
    
    try {
      const response = await axios.post("http://glorykifaru.alwaysdata.net/api/signin", formdata)
      setSuccess(response.data.message)
      setLoading("")
   
      if (response.data.user && response.data.token) {
        // Save user and token to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        
        // Dispatch login event so Navbar updates
        window.dispatchEvent(new Event("loginStatusChanged"));
        
        // Redirect to home
        navigate("/");
      }
    }
    catch (error) {
      setError(error.response?.data?.message || error.message || "Login failed")
      setLoading("")
    }
  }

  return (
    <div className='row mt-2 justify-content-center'>
      <div className='col-md-6 card shadow bg-dark'>
        <h1 className='text-white'>🔐 Sign In</h1>

        {/* Messages */}
        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>

        <form onSubmit={handlesubmit}>
          
          <input 
            type="email" 
            placeholder=' ✉️ Email' 
            className='form-control' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> 
          <br />

          <input 
            type="password" 
            placeholder=' 🔑 Password' 
            className='form-control' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> 
          <br />

          <button type='submit' className='btn btn-info w-100' disabled={loading !== ""}>
            {loading ? "Signing in..." : "Sign In"}
          </button> 
          <br /><br />

          <p className='text-white'>
            Don't have an account? <Link to="/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signin