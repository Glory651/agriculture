import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // declare our state here 
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  // three states for posting data 
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

 
  // function to handle Submit 
  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("please wait...")
    // create an empty digital envelope 
    const formdata = new FormData()
    formdata.append("username", username)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("phone", phone)
    try {
      const response = await axios.post("http://glorykifaru.alwaysdata.net/api/signup", formdata)
      setSuccess(response.data.message)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }
   // password strength checker 
  const [strength, setStrength] = useState("")
  const checkPasswordStrength = (password) =>{
     if(password.length < 4 ){setStrength("Weak");}
     else if (password.length < 8 ){setStrength("Medium");}
     else {setStrength("Strong");}
  };
  
  
  return (
    <div className='full-height'>


      <div className='row mt-2 justify-content-center'>
        <div className='col-md-6 card shadow w-90 bg-dark '>
          <h1 className='text-white'>Signup</h1>
          {/* bind the states */}
          <h2 className="text-warning">{loading}</h2>
          <h2 className="text-success"> {success}</h2>
          <h2 className="text-danger"> {error} </h2>
          <form action="" onSubmit={handlesubmit}>
            <input type="text" placeholder=' 👤Enter username' className='form-control' onChange={(e) => setUsername(e.target.value)} /> <br />
            <input type="email" placeholder=' ✉️Enter Email' className='form-control' onChange={(e) => setEmail(e.target.value)} /><br />
         
              <input type='password' className='form-control' placeholder=' 🔑 Enter password' onChange={(e) => {
                setPassword (e.target.value);
                 checkPasswordStrength(e.target.value);
                 }} />
         
                {password && (
                  <p
                   style ={{
                      color: 
                      strength === "Weak"
                       ? "red"
                        : strength === "Medium"
                        ? "orange"
                         :"green",
                           }}
                    > Password Strength :{strength}
              </p>
                )}
                 <br />
                    <input type="phone" placeholder=' 📲Enter phone' className='form-control' onChange={(e) => setPhone(e.target.value)} /><br />
    

            <button type='submit' className='btn btn-info w-100'>Signup</button><br />
            <p className='text-white'>Already have an acount?  <Link to="/Signin" > Signin</Link> </p>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Signup    
