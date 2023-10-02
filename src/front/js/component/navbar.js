<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logoImageUrl from "../../img/logo.png";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const storage = localStorage.getItem('user_id');

  const handleLogout = () => {
    localStorage.clear();
  };

=======
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logoImageUrl from "../../img/logo.png";

export const Navbar = ({ aboutUsSectionRef }) => {
  const currentPath = window.location.pathname;
  const [storage, setStorageData] = useState()
  const scrollToAboutUs = () => {
    if (aboutUsSectionRef.current) {
      aboutUsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleLogout = () => {
    localStorage.clear()
    setStorageData(null)
  }
  useEffect(() => {
    setStorageData(localStorage.getItem('user_id'))
  })
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
        </Link>
        <div className={`navLinks ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/aboutUs">About Us</Link>
          {storage > 0 ? (
            <Link
              to="/login"
              className="button-link login-button"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" className="button-link login-button">
              Login
            </Link>
          )}
<<<<<<< HEAD
          <Link to="/signup" className="button-link signup-button">
=======
          {storage != null ? <RouterLink to="/login" className="button-link login-button" onClick={handleLogout}>
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
