import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Morocco1ImageUrl from "../../img/morocco1.jpg";

const DonatePage = () => {
  const { store, actions } = useContext(Context);
  const [currency, setCurrency] = useState(["USD", "Bitcoin", "EUR", "AUD"]);
  const [selection, setSelection] = useState(currency[0]);
  const [activeButton, setActiveButton] = useState(null);
  const [amountToDonate, setAmountToDonate] = useState(0);
  const handleAmountClick = (buttonId) => {
    document.querySelector(".amount-input").value = "";
    setActiveButton(buttonId);
    setAmountToDonate(parseInt(buttonId));
  };
  const checkout = async () => {
    // Validate the donation amount
    if (isNaN(amountToDonate) || amountToDonate <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    await fetch('https://reimagined-space-giggle-pxv6vxpq94q26wr7-3001.app.github.dev/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amountToDonate})
    })
    // add on line 29 next to amount to donate if you want to use the currency slection, currency: selection 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        if (data.url) {
          window.location.assign(data.url);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`An error occurred: ${error.message}`);
      });
  };

  return (
    <>
      <div className="container width:100px">
        <div class="row">
          <div className=" col-6 p-5">
            <h3>
              Empowering Morocco's Resilience Through Compassion and Action
            </h3>

            <div class="row-md-3 p-3">
              <text>
                At HelpingHands Morocco, we are dedicated to providing immediate
                relief and long-term support to the earthquake-affected regions
                of Morocco. Our mission is clear: to rebuild lives and
                communities, one step at a time. We believe in the power of
                collective action and compassion to bring hope to those in need.
                Join us on this journey to make a difference and support the
                resilient people of Morocco as they rebuild their lives after
                the earthquake
              </text>
            </div>
          </div>

          <div className="col-6 p-5 d-flex flex-column ">
            <div className="row">
              <div class="col-3">
                <p>Donate Now </p>
              </div>
              <div class="col-9 text-end dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <text> {selection} </text>
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {currency.map((item) => (
                    <li onClick={() => setSelection(item)}>
                      <a class="dropdown-item" href="#">
                        {" "}
                        {item}{" "}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                <div class="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={` btn btn-info w-100 amountButton ${activeButton == "10" ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick("10");
                    }}
                  >
                    $10.00
                  </button>
                </div>
                <div class="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={` btn btn-info w-100 amountButton ${activeButton == "20" ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick("20");
                    }}
                  >
                    $20.00
                  </button>
                </div>
                <div class="col-4">
                  <label> </label>
                  <button
                    type="button"
                    className={`btn btn-info w-100 amountButton ${activeButton == "30" ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick("30");
                    }}
                  >
                    $30.00
                  </button>
                </div>
              </div>
              <div className="row">
                <div class="col-4">
                  <button
                    type="button"
                    className={`btn btn-info w-100 amountButton ${activeButton == "60" ? "activeAmountButton" : ""
                      }`}
                    onClick={() => {
                      handleAmountClick("60");
                    }}
                  >
                    $60.00
                  </button>
                </div>

                <div class="col-8">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={`amount-input w-100 form-control`}
                    placeholder="$ other amount"
                    onChange={(e) => {
                      setActiveButton("");
                      setAmountToDonate(parseFloat(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="text-center pt-4">Your Gift Amount</div>

              <div className="row pt-3">
                <div className="d-flex align-items-center">
                  <strong>Choose Payment</strong>

                  <div className="d-flex align-items-center">
                    <i class="fa-solid fa-lock mx-3"></i>
                    <strong>Secure</strong>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div class="col-6 text-center">
                  <button onClick={() => console.log(amountToDonate)}
                    type="button" className="btn btn-info w-100">
                    Pay With PayPal
                  </button>
                </div>
                <div class="col-6 text-center">
                  <button
                    onClick={() => checkout(amountToDonate)}
                    type="button"
                    className="btn btn-info w-100"
                  >
                    Pay With Stripe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <div class="row">
            <div className=" col-4 p-5">
              <p>
                <i class="fa-solid fa-square-check"></i>
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
                <i class="fa-brands fa-font-awesome"></i>
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
                <i class="fa-regular fa-star"></i>
              </p>
              <h4> Feature Three </h4>
              <p>
                Vestibulum ultricies erat vitae faucibus vulputate. Sed finibus
                ipsum eu nibh volutpat, in congue sapien vehicula condimentum
                ligula vitae.
              </p>
            </div>
          </div>
        </div>

        <div class="row">
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
          <div className="col-6 p-5">
            <img src={Morocco1ImageUrl} alt="Morocco" width="460" height="345" />
          </div>
        </div>

        <div className="text-center mt-5">
          <div>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo lectus, ac blandit elit tincidunt id."
            </p>
          </div>
          <div>
            <i class="fa-regular fa-image"></i>
            <p>John Doe, CTO of Client Company</p>
          </div>
        </div>

        <div className="text-center mt-5">
          <div>
            <h2>Get In Touch </h2>
          </div>
          <div>
            <p>
              Stay connected with us! Subscribe to our newsletter by entering
              your email below. Receive updates on our relief efforts and
              stories of impact. Together, we can make a difference. Join us in
              bringing hope and relief to those in need.
            </p>
          </div>
          <div className="text-center  mt-5">
            <div className="row">
              <div class="col-5">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Email Address"
                />
              </div>
              <div class="col-5 ">
                <label> </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Full Name"
                />
              </div>
              <div class="col-2 p-4">
                <button type="button" class="btn btn-secondary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatePage;
