import axios from 'axios'
import React,{useState} from 'react'
 const Addproduct = () => {
  const [product_name, setProductname] = useState("")
  const [product_description, setProductdescription] = useState("")
  const [product_cost, setProductcost] = useState("")
  const [product_photo, setProductPhoto] = useState("")

  // define states for hosting 
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  //  function to handle submit 
  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("please wait...")

    // empty digital envelope 
    const formdata = new FormData()
    formdata.append("product_name", product_name)
    formdata.append("product_description", product_description)
    formdata.append("product_cost", product_cost)
    formdata.append("product_photo", product_photo)

    try {
      const response = await axios.post("http://glorykifaru.alwaysdata.net/api/add_product", formdata)
      setSuccess(response.data.message)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }

  }



  return (
    <div className='row mt-2 justify-content-center '>
      <div className='col-md-6 card shadow p-4  bg-dark'>
        <h2 >Add products</h2>

        {/* bind the states  */}
        <h2 className='text-warning'> {loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>

        <form action="" onSubmit={handlesubmit}>
          <input type="text" placeholder='Enter product name' className='form-control' onChange={(e) => setProductname(e.target.value)} /> <br />
          <input type="text" placeholder='Enter product description' className='form-control' onChange={(e) => setProductdescription(e.target.value)} /> <br />
          <input type="number" placeholder='Enter product price' className='form-control' onChange={(e) => setProductcost(e.target.value)} />br
          <input type="file" className='form-control' accept='image/*' onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />
          <input type="submit" value=" addproduct" className='btn btn-outline bg-info' />

        </form>
      </div>
    </div>
  )
}

export default Addproduct