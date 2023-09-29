import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImageUrl from "../../img/logo.png";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
<<<<<<< HEAD


  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Define breakpoint for larger screens (768px)
      const breakpoint = 768;
      if (screenWidth >= breakpoint) {
        closeMobileMenu();
      }
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

=======
  const storage = localStorage.getItem('user_id')
  const handleLogout = () => {
    localStorage.clear()
  }
>>>>>>> main
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            className="logo"
            src={logoImageUrl}
            style={{ width: "220px", height: "220px" }}
            alt="Logo"
          />
<<<<<<< HEAD
        </Link>
        <div className={`navLinks ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/login" className="button-link login-button">
            Login
          </Link>
          <Link to="/signup" className="button-link signup-button">
=======
        </RouterLink>
        <div className="navLinks">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          {currentPath === "/" ? (
            <ScrollLink
              to="aboutUs"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              About Us
            </ScrollLink>
          ) : (
            <RouterLink to="/aboutUs">About Us</RouterLink>
          )}
          {storage > 0 ? <RouterLink to="/login" className="button-link login-button" onClick={handleLogout}>
            Logout
          </RouterLink> : <RouterLink to="/login" className="button-link login-button">
            Login
          </RouterLink>}
          <RouterLink to="/signup" className="button-link signup-button">
>>>>>>> main
            Sign Up
          </Link>
        </div>
        <div
          className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};
