import React from 'react';
import { Link } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";

const Signup = () => {
  return (
    <>
       <div className='login-wrapper'>
         <img src={bannerImgURL} alt="Helpeing hands banner" className='banner-image'/>
         <div className='row login-text'>
          <div className='d-flex'>
          <h3 className='left-login-container'>Effortless Giving, Immediate <br/><br/>Our app streamlines the process of supporting earthquake relief in Morocco. Experience the ease of giving with just a few taps and witness your contributions create an immediate impact. Join us in making a real difference, effortlessly.</h3>
          <div className='login-container'>
            <h3 className='mb-4'>Sign up</h3>
            <div className='row col'>
            <div className="mb-3 col-md-6 ms-0">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="Enter First name" />
            </div>
            <div className="mb-3 col-md-6 ms-0">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Enter Last name" />
            </div>
            </div>
            <div className="mb-3 row ms-0">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3 row ms-0">
              <label htmlFor="inputPassword" className="col-form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" />
            </div>
            <button type="button" className="btn btn-primary">Sign up</button>
            <div className='mt-3'>Already have an account? <Link to={'/login'}>Login here!</Link></div>
          </div>
          </div>
         </div>
       </div>

    </>
  )
}

export default Signup