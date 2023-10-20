import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/paymentPage.css";
import Morocco1ImageUrl from "../../img/morocco1.jpg";
import { useNavigate } from "react-router-dom";
import backgroundUrl from "../../img/about-bg.jpg"


const PaymentPage = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  let amount = store.amount.toString();
  const [full_name, setFull_name] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [state, setState] = useState("")
  const [creditCard, setCreditCard] = useState("")
  const [month, setMonth] = useState("")
  const [cvv, setCvv] = useState("")
  const [year, setYear] = useState("")

  const donateNowCall = () => {
    if (full_name != '' && email != '') {
      actions.checkout(full_name, address1 + ", " + address2 + ", " + city + ", " + state, phone, email);
      if (store.redirectToThankYouPage) {
        navigate("/thank-you-page");
      }
    }
  }


  return (
    <>
      <div className="page-header" style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Billing Information</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container PaymentPagecontainer">

        <div className="row">
          <div className="col-lg-6 col-md-12 p-5">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Full Name"
              onChange={(e) => setFull_name(e.target.value)}
            />

            <label htmlFor="address1">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              id="address1"
              placeholder="Address Line 1"
              onChange={(e) => setAddress1(e.target.value)}
            />

            <label htmlFor="address2">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="Address Line 2"
              onChange={(e) => setAddress2(e.target.value)}
            />

            <div className="row">
              <div className="col-6">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="phone">Phone Number (optional)</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-lg-6 col-md-12 p-5">
            {/* Note: For security reasons, consider using a specialized library or service for credit card inputs */}
            <label htmlFor="creditCard">Credit Card Number</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              id="creditCard"
              placeholder="Credit Card number"
              onChange={(e) => setCreditCard(e.target.value)}
            />

            <div className="row">
              <div className="col-4">
                <label htmlFor="expMonth">Expiration Month</label>
                <input
                  type="text"
                  className="form-control"
                  id="expMonth"
                  placeholder="MM"
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label htmlFor="expYear">Expiration Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="expYear"
                  placeholder="YYYY"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  placeholder="CVV"
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>

            <div className="row p-4">
              <form action="">
                <input type="checkbox" id="coverFees" />
                <label htmlFor="coverFees">
                  I'd like to cover the fees associated with my donation so more of my donation goes directly to HelpingHandsMorocco
                </label>
              </form>

              <div className="text-center mt-4">
                <p>Amount</p>
                <strong> {amount.slice(0, -2) + "." + amount.slice(-2)} </strong>
                <br />

                <div className="d-flex">
                  <button
                    type="button"
                    className="btn cancelButton"
                    onClick={() => {
                      navigate("/paymentPage")
                    }}
                  >
                    Cancel

                  </button>

                  <button
                    type="button"
                    className="btn paymentButton"
                    onClick={donateNowCall}
                  >
                    Donate Now
                  </button>
                </div>

                <br />
                <p>
                  When user clicks the Donate Button, it will take the user to the thank you page or maybe an alert saying thank you for the donation
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-lg-6 col-md-12 p-5">
            <img src={Morocco1ImageUrl} alt="Morocco" width="460" height="345" />
          </div>
          <div className=" col-lg-6 col-md-12 p-5">
            <h4>
              Effortless Giving, <br></br>
              Immediate Impact
            </h4>{" "}
            <br></br>
            <p>
              Our app streamlines the process of supporting earthquake relief in
              Morocco. Experience the ease of giving with just a few taps and
              witness your contributions create an immediate impact. Join us in
              making a real difference, effortlessly.
            </p>
          </div>

        </div>




      </div>
    </>
  );
};

export default PaymentPage;
