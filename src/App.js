import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';


// AUTH CHECK
const isAuth = () => {
  return !!localStorage.getItem("token");
};

// PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  if (!isAuth()) {
    return <Navigate to="/Signin" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* navbar */}
        <Navbar />

        <div className="App full-height">
          <header className="App-header">
            <div className='header'>
              <img src="images/fertilizer4.png" alt="icon" width="90px" height="90px" />
              <h1 className='text-center text-white'>
                Waste -to- wealth manifestation !
              </h1>
            </div>
          </header>

          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path='/Home' element={<Home />} />
            <Route path='/' element={<Getproduct />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/cart' element={<Cart />} />
<Route path='/makepayment' element={<Makepayment /> } />
            {/* PROTECTED ROUTES */}
            <Route path='/addproduct' element={
              <ProtectedRoute>
                <Addproduct />
              </ProtectedRoute>
            } />

           

            <Route path='/makepayment' element={
              <ProtectedRoute>
                <Makepayment />
              </ProtectedRoute>
            } />

          </Routes>
        </div>
      </div>

      <Chatbot />
    </BrowserRouter>
  );
}

export default App;