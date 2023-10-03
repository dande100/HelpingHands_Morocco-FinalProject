import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";
import logoImageUrl from "../../img/capture.png";
import googleImg from "../../img/google.png";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase.js'
import { Context } from "../store/appContext";
const divStyle = {
  backgroundImage: `url(${bannerImgURL})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  color: '#fff'
};

const Authenticate = (props) => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('not specified');
  const [street_address, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context)
  const [storage, setStorageData] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    setStorageData(localStorage.getItem('user_id'))
  })

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      console.log('Google login successful', provider);

      const obj = {
        email: input,
        password: password,
        social: true
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      console.log('Facebook login successful');
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
<<<<<<< HEAD

=======
>>>>>>> main

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input != '' && password != '' && props.showLogin) {
      const obj = {
        email: input,
        password: password,
        social: false
      }
      actions.getToken(obj).then(() => {
        if (store.isLoginSuccess) {
          navigate('/dashboard')
        }
      })
    } else if (props.showSignup && firstName != '' && lastName != '' && input != '' && password != '') {
      const obj = {
        email: input,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        gender: gender,
        street_address: street_address,
        city: city,
        state: state,
        country: country
      }
      actions.createAccount(obj).then(() => {
        if (store.isSignup) {
          navigate('/login')
          store.message = null,
            store.error = null
        }
      })
    } else if (props.showRecovery && input != '' && newPassword != '') {
      const obj = {
        email: input,
        old_password: password,
        new_password: newPassword
      }
      actions.changePassword(obj).then(() => {
        if (store.isPasswordRecovery) {
<<<<<<< HEAD
=======
          if (store.isChangePassword) {
            navigate('/login')
          }
        }
      })
    } else if (props.showForgotPassword) {
      const obj = {
        email: input
      }
      actions.requestForgotPassword(obj)
    } else if (props.showResetPassword && newPassword != '') {
      const obj = {
        new_password: newPassword,
        email: searchParams.get('email'),
        token: searchParams.get('token')
      }
      actions.resetPassword(obj).then(() => {
        if (store.isPasswordReset) {
>>>>>>> main
          navigate('/login')
        }
      })
    }
  }
  return (
    <>
      <div className='login-wrapper row'>
        <div className='col-md-8 col-sm-12' style={divStyle}>
          <h3 className='left-login-container'>Effortless Giving, Immediate <br /><br />Our app streamlines the process of supporting earthquake relief in Morocco. Experience the ease of giving with just a few taps and witness your contributions create an immediate impact. Join us in making a real difference, effortlessly.</h3>
        </div>
        <div className='row login-text col-sm-12 col-md-4'>
          <div className='login-container'>
            <div className='logo-image-wrapper'>
              <Link to="/">
                <img
                  className="logo"
                  src={logoImageUrl}
                  style={{ width: "95px" }}
                />
              </Link>
            </div>

            {store.error && <div className="alert alert-danger" role="alert">
              {store.error}
            </div>}
            {store.message && <div className="alert alert-success" role="success">
              {store.message}
            </div>}
            <h3 className='mb-4'>{props?.title}</h3>
            <form id="needs-validation" noValidate onSubmit={handleSubmit}>
              {props?.showSignup && <div className='row col'>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" required placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>}
<<<<<<< HEAD
              {!props.showResetPassword && <div className="mb-3 row ms-0">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required placeholder="name@example.com" onChange={(e) => setInput(e.target.value)} value={input} />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>}
              {!props?.showRecovery && <div className="mb-3 row ms-0">
=======
              {!props?.showRecovery && <div className="mb-3 row ms-0">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setInput(e.target.value)} value={input} />
              </div>}
              {props?.showSignup && <div className="mb-3 col-md-6 ms-0">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="phone" placeholder="555-123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>}
              {props?.showSignup && <div className="mb-3 col-md-6 ms-0">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select onChange={(e) => {
                  setGender(e.target.value)
                }} className="picker" id="gender">
                  <option value="not specified">Select your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not specified">I'd rather not say</option>
                </select>
              </div>}
              {props?.showSignup && <div className="mb-3 row ms-0">
                <label htmlFor="street_address" className="form-label">Street Address</label>
                <input type="text" className="form-control" id="street_address" placeholder="1234 main street" value={street_address} onChange={(e) => setStreetAddress(e.target.value)} />
              </div>}
              {props?.showSignup && <div className="mb-3 col-md-6 ms-0">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" placeholder="Miami" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>}
              {props?.showSignup && <div className="mb-3 col-md-6 ms-0">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" className="form-control" id="state" placeholder="Florida" value={state} onChange={(e) => setState(e.target.value)} />
              </div>}
              {props?.showSignup && <div className="mb-3 row ms-0">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control" id="country" placeholder="USA" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>}
              {!props?.showChangePassword && !props.showForgotPassword && !props.showResetPassword && <div className="mb-3 row ms-0">
>>>>>>> main
                <label htmlFor="inputPassword" className="col-form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" />
                {props.showLogin && <div className='text-end fst-italic'><Link to={'/forgot-password'}>Forgot a password?</Link></div>}
              </div>}
              {props?.showChangePassword && <>
                <div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">Old Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" />
                </div><div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">New Password</label>
                  <input type="password" className="form-control" id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div></>}
              {props?.showResetPassword && <><div className="mb-3 row ms-0">
                <label htmlFor="inputPassword" className="col-form-label">New Password</label>
                <input type="password" className="form-control" id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
              </div></>}
              <button type="submit" className="btn btn-primary">{props?.buttonText}</button>
            </form>
            {props?.showLogin && <div className='mt-3'>Don't have an account yet! <Link to={'/signup'}>Create one</Link></div>}
            {props?.showSignup && <div className='mt-3'>Already have an account? <Link to={'/login'}>Login here!</Link></div>}

            {props?.showGoogleLogin && <>
              <hr className='mt-4' />
              <div className='d-flex justify-content-center'>
                <button className="btn btn-light mb-3" onClick={signInWithGoogle}><img src={googleImg} style={{ width: "30px", height: "30px" }} /> <strong>{props?.showLogin ? 'Continue with Google' : 'Signup with Google'}</strong></button>
              </div>
            </>
            }
          </div>
        </div>

      </div>

    </>
  )
}

export default Authenticate