import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/contact" className="footerLinks">Contact</Link>
        </div>
        <div className="col">
          <Link to="/about" className="footerLinks">About</Link>
        </div>
        <div className="col">
          <Link to="/follow-us" className="footerLinks">Follow Us</Link>
        </div>
      </div>
      <div className="col">
		<br></br>
        &copy; 2023 Helping Hands. All rights reserved.
      </div>
    </div>
  </footer>
);
