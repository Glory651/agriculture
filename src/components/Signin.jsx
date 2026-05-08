import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signin = () => {
    let navigate = useNavigate();

  // declare the states here {
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

    // create a empty digital envelope 
    const formdata = new FormData ()
    formdata.append("email", email)
    formdata.append("password", password)
    try {
      const response = await axios.post("http://glorykifaru.alwaysdata.net/api/signin", formdata)
      setSuccess(response.data.message)
      setLoading("")
   
       if (response.data.user) {
  localStorage.setItem("user", JSON.stringify(response.data.user));
  navigate("/");
}
      }
    catch (error) {
      setError(error.message)
      setLoading("")


    }
  }
  return (
    <div className='row mt-2 justify-content-center'>
      <div className='col-md-6 card shadow bg-dark'>
        <h1 className='text-white'>Signin</h1>

        {/* binding  */}
        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>
        <form action="" onSubmit={handlesubmit}>
          
          <input type="email" placeholder=' ✉️Email' className='form-control' onChange={(e) => setEmail(e.target.value)} /> <br />
          <input type="password" placeholder=' 🔑password' className='form-control' onChange={(e) => setPassword(e.target.value)} /> <br />
          <button type='submit' className='btn btn-info w-100'>Signin</button> <br /><br />
          <p className='text-white'> Don't have an account?<Link to ="/signup">Signup</Link></p>
        </form>
      </div>

    </div>
  )
}

export default Signin