import React from 'react';
import { Link } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";

const Login = () => {
  return (
    <>
       <div className='login-wrapper'>
         <img src={bannerImgURL} alt="Helpeing hands banner" className='banner-image'/>
         <div className='row login-text'>
          <div className='d-flex'>
          <h3 className='left-login-container'>Effortless Giving, Immediate <br/><br/>Our app streamlines the process of supporting earthquake relief in Morocco. Experience the ease of giving with just a few taps and witness your contributions create an immediate impact. Join us in making a real difference, effortlessly.</h3>
          <div className='login-container'>
            <h3 className='mb-4'>Login</h3>
            <div className="mb-3 row ms-0">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="emial" placeholder="name@example.com" />
            </div>
            <div className="mb-3 row ms-0">
              <label htmlFor="inputPassword" className="col-form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" />
            </div>
            <button type="button" className="btn btn-primary">Login</button>
            <div className='mt-3'>Don't have an account yet! <Link to={'/signup'}>Create one</Link></div>
          </div>
          </div>
         </div>
       </div>

    </>
  )
}

export default Login