import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";
import logoImageUrl from "../../img/logo.png";
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
  const [newPassword, setNewPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()
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
      actions.getToken(obj).then(() => {
        // local storage having access_token
        console.log("/navigate to donate page")
      })
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
 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (input != '' && password != '' && props.showLogin) {
      const obj = {
        email: input,
        password: password,
        social: false
      }
      actions.getToken(obj).then(() => {
        if(store.isLoginSuccess) {
          navigate('/dashboard')
        }
      })
    } else if(props.showSignup && firstName != '' && lastName != '' && input != '' && password != '') {
      const obj = {
        email: input,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
     actions.createAccount(obj).then(() => {
        if(store.isSignup) {
          navigate('/login')
          store.message = null,
          store.error = null
        }
      })
    } else if(props.showRecovery && input != '' && newPassword != '') {
      const obj = {
        email: input,
        new_password: newPassword
      }
      actions.changePassword(obj).then(() => {
        if(store.isPasswordRecovery) {
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
                  style={{ width: "250px" }}
                />
              </Link>
            </div>
            
            {store.error && <div className="alert alert-danger" role="alert">
            {store.error}
            </div> }
            {store.message && <div className="alert alert-success" role="success">
            {store.message}
            </div> }
            <h3 className='mb-4'>{props?.title}</h3>
            <form id="needs-validation" noValidate onSubmit={handleSubmit}>
              {props?.showSignup && <div className='row col'>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" required placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" required placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>}
              <div className="mb-3 row ms-0">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required placeholder="name@example.com" onChange={(e) => setInput(e.target.value)} value={input} />
              </div>
              {!props?.showRecovery && <div className="mb-3 row ms-0">
                <label htmlFor="inputPassword" className="col-form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" required />
                <div className='text-end fst-italic'><Link to={'/forgot-password'}>Forgot a password?</Link></div>
              </div>}
              {props?.showRecovery && <div className="mb-3 row ms-0">
                <label htmlFor="inputPassword" className="col-form-label">New Password</label>
                <input type="password" required className="form-control" id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
              </div>}
              <button type="submit" className="btn btn-primary">{props?.buttonText}</button>
            </form>
            {props?.showLogin && <div className='mt-3'>Don't have an account yet! <Link to={'/signup'}>Create one</Link></div>}
            {props?.showSignup && <div className='mt-3'>Already have an account? <Link to={'/login'}>Login here!</Link></div>}

            {!props?.showRecovery && <>
              <hr />
              <button className="btn btn-outline-danger mb-3" onClick={signInWithGoogle}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg> Sign in with Google</button><br></br>
              <button className="btn btn-outline-primary" onClick={signInWithFacebook}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg> Sign in with Facebook</button> </>
            }
          </div>
        </div>

      </div>

    </>
  )
}

export default Authenticate