import React from 'react';
import { Link } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";
const ForgotPassword = () => {
  return (
    <>
      <div className='login-wrapper'>
        <img src={bannerImgURL} alt="Helpeing hands banner" className='banner-image' />
        <div className='row login-text'>
          <div className='d-flex'>
            <h3 className='left-login-container'>Effortless Giving, Immediate <br /><br />Our app streamlines the process of supporting earthquake relief in Morocco. Experience the ease of giving with just a few taps and witness your contributions create an immediate impact. Join us in making a real difference, effortlessly.</h3>
            <div className='login-container'>
              <h3 className='mb-4'>Recovery Password</h3>
              <form>
                <div className="mb-3 row ms-0">
                 <label htmlFor="email" className="form-label">Email address</label>
                 <input type="email" className="form-control" id="email" required placeholder="name@example.com" />
                </div>
                <div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">New Password</label>
                  <input type="password" required className="form-control" id="inputPassword" />

                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ForgotPassword