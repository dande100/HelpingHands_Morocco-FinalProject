import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logoImageUrl from "../../img/logo.png";

export const Navbar = ({ aboutUsSectionRef }) => {
  const currentPath = window.location.pathname;
  const scrollToAboutUs = () => {
    if (aboutUsSectionRef.current) {
      aboutUsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const storage = localStorage.getItem('user_id')
  const handleLogout = () => {
    localStorage.clear()
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <RouterLink to="/">
          <img
            className="logo"
            src={logoImageUrl}
            style={{ width: "220px", height: "220px" }}
          />
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
            Sign Up
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};
