import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/donatepage.css";
import Morocco1ImageUrl from "../../img/morocco1.jpg";
import { useNavigate } from "react-router-dom";
import backgroundUrl from "../../img/about-bg.jpg"


const DonatePage = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [currency, setCurrency] = useState(["USD", "Bitcoin", "EUR", "AUD"]);
  const [selection, setSelection] = useState(currency[0]);
  const [activeButton, setActiveButton] = useState(null);
  const [amountToDonate, setAmountToDonate] = useState(0);
  const [stripeLoading, setStripeLoading] = useState(false);

  const handleAmountClick = (buttonId) => {
    document.querySelector(".amount-input").value = "";
    setActiveButton(buttonId);
    setAmountToDonate(parseInt(buttonId));
  };
  const changeCustom = (amount) => {
    let newAmountArray = amount.toString().split(".")
    let result = ""

    setActiveButton("");

    for (let i = 0; i < newAmountArray.length; i++) {
      result += newAmountArray[i]
    }

    if (!amount.toString().includes(".")) {
      result += "00"
    }


    setAmountToDonate(parseInt(result));
  }





  return (
    <>
      <div className="page-header" style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Donate Now</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container donatePagecontainer">

        <div className="row">
          <div className="col-6 p-5">
            <h3>
              Empowering Morocco's Resilience Through Compassion and Action
            </h3>

            <div className="row-md-3 p-3">
              <span>
                At HelpingHands Morocco, we are dedicated to providing immediate
                relief and long-term support to the earthquake-affected regions
                of Morocco. Our mission is clear: to rebuild lives and
                communities, one step at a time. We believe in the power of
                collective action and compassion to bring hope to those in need.
                Join us on this journey to make a difference and support the
                resilient people of Morocco as they rebuild their lives after
                the earthquake
              </span>
            </div>
          </div>
          <div className="col-6 p-5 d-flex flex-column ">

            <div className="">
              <div className="d-flex">
                <div className="">
                  <input type="radio" name="frequency" value="one_time" /> One
                  Time
                </div>

                <div className="mx-2">
                  <input type="radio" name="frequency" value="monthly" />{" "}
                  Monthly
                </div>
              </div>
              <div className="row my-2">
                <div className="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={` btn donationButton w-100 amountButton ${activeButton == 1000 ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick(1000);
                    }}
                  >
                    $10.00
                  </button>
                </div>
                <div className="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={` btn donationButton w-100 amountButton ${activeButton == 2000 ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick(2000);
                    }}
                  >
                    $20.00
                  </button>
                </div>
                <div className="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={`btn donationButton w-100 amountButton ${activeButton == 3000 ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick(3000);
                    }}
                  >
                    $30.00
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn donationButton w-100 amountButton ${activeButton == 6000 ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick(6000);
                    }}
                  >
                    $60.00
                  </button>
                </div>

                <div className="col-8">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={`amount-input w-100 form-control`}
                    placeholder="$ other amount"
                    onChange={(e) => {
                      changeCustom(e.target.value)
                    }}
                  />
                </div>
              </div>


              <div className="row pt-3">
                <div className="d-flex align-items-center">
                  <strong>Choose Payment</strong>

                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-lock mx-3"></i>
                    <strong>Secure</strong>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-6 text-center">
                  <button onClick={() => console.log(amountToDonate)}
                    type="button" className="btn activeAmountButton w-100">
                    Pay With PayPal
                  </button>
                </div>
                <div className="col-6 text-center">
                  <button
                    onClick={() => {
                      if (amountToDonate < 50) {
                        alert("Minimum donation is $0.50")
                      } else {
                        actions.updateAmount(amountToDonate)
                        navigate("/paymentPage")
                      }
                    }}
                    type="button"
                    className="btn activeAmountButton w-100"
                  >
                    Pay With Stripe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-center mt-5">
          <div className="row ">
            <div className=" col-4 p-5">
              <p>
                <i className="fa-solid fa-square-check fa-2xl  donatePageIcons"></i>
              </p>
              <h4> Feature One </h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                quis felis convallis, rhoncus leo id, scelerisque purus. Ut
                auctor gravida nulla.
              </p>
            </div>
            <div className=" col-4 p-5 ">
              <p>
                <i className="fa-brands fa-font-awesome fa-2xl mb-1 donatePageIcons"></i>
              </p>
              <h4> Feature Two </h4>

              <p>
                Aliquam vel nibh iaculis, ornare purus sit amet, euismod dui.
                Cras sed tristique neque. Cras ornare dui lorem, vel rhoncus
                elit venenatis sit amet.
              </p>
            </div>
            <div className=" col-4 p-5">
              <p>
                <i className="fa-regular fa-star fa-2xl donatePageIcons"></i>
              </p>
              <h4> Feature Three </h4>
              <p>
                Vestibulum ultricies erat vitae faucibus vulputate. Sed finibus
                ipsum eu nibh volutpat, in congue sapien vehicula condimentum
                ligula vitae.
              </p>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-6 p-5">
            <img src={Morocco1ImageUrl} alt="Morocco" width="460" height="345" />
          </div>
          <div className=" col-6 p-5">
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
export default DonatePage;