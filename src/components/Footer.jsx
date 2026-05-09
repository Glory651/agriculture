import React from 'react'

const Footer = () => {
  return (
    <div>
         <section class="row  p-3">
      {/* <!-- child 1  -->  */}
      <div class="col-md-4">
        <h2 class="text-center text-white">About us</h2>
        <p class="text-white">We offer very qaulity products at a very freindly price.We do
          also offer 24hours customer services.</p>
      </div>
      {/* <!-- child 2  --> */}
      <div class="col-md-4">
        <h2 class="text-center text-white">Contact Us</h2>
        <form action="">
          <input type="email" placeholder="Enter your email" class="form-contol"/><br/><br/>
          <textarea name="" id="" class="form-control" placeholder="leave a comment"></textarea><br/><br/>
          <input type="submit" value="Send Mesage" class="btn btn-outline-danger"/>
        </form>
      </div>
      {/* <!-- child 3  --> */}
      <div class="col-md-4">
        <h2 class="text-center text-white">Stay Connected</h2>
        <a href="https://facebook.com">
          <img src="images/fb.png" alt="fb"/>
        </a>
        <a href="https://instagram.com">
          <img src="images/in.png" alt="instagram"/>
        </a>
        <a href="https://twitter.com">
          <img src="images/x.png" alt="twitter"/>
        </a>
        <p>We are located at Muthithi Road Westlands and always available on all our social media platform.</p>
      </div>
    </section>
    </div>
  )
}

export default Footer