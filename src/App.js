
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* navbar goes here  */}
        <Navbar />
        <div className="App full-height">
          <header className="App-header">
            <div className='header'>
              <img src="images/fertilizer4.png" alt=" icon" width="90px" height="90px" />
              <h1 className='text-center text-white ' >Waste -to- wealth manifestation !</h1>
            </div>

          </header>
          {/* <nav>  */}
          {/* <Link to="/Home" className='btn btn- outline bg-danger '>Home</Link>  */}
          {/* <Link to="/Signup" className='btn btn- outline bg-info '>Signup</Link>  */}
          {/* <Link to="/Signin" className='btn btn- outline bg-success'>Signin</Link>  */}
          {/* <Link to="/"  className='btn btn- outline bg-danger'>Getproduct</Link>  */}
          {/* <Link to="/addproduct"  className='btn btn- outline bg-success '>Addproduct</Link> */}

          {/* </nav>  */}
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/' element={<Getproduct />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/makepayment' element={<Makepayment />} />
           

          </Routes>
        </div>
      </div>
      
      <Chatbot/>
    </BrowserRouter>
  );
}

export default App;
