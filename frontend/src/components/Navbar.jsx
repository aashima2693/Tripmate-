// src/components/Navbar.jsx

import React from 'react';
// Assuming you will create Navbar.css next for desktop specific styles
import '../styles/Navbar.css';
// Use an icon for the profile, mirroring the original image
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">TripMate</a> 
      </div>
      
      {/* PUSHBACK: Real websites need navigation links, not just a logo.
        Add these later once you have more pages/sections.
      */}
      <div className="navbar-links">
        {/*
        <a href="#features">Features</a>
        <a href="#destinations">Destinations</a>
        <a href="/login">Login</a>
        */}
      </div>
      
      <div className="navbar-profile">
        <FaUserCircle size={30} color="var(--color-text-dark)" />
      </div>
    </nav>
  );
};

export default Navbar;