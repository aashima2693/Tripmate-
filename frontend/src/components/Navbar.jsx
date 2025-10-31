// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand navbar-brand-gradient">TripMate</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto fw-medium">
            <li className="nav-item"><Link to="/" className="nav-link text-dark">Home</Link></li>
            <li className="nav-item"><Link to="/companions" className="nav-link text-dark">Companions</Link></li>
            <li className="nav-item"><Link to="/loan" className="nav-link text-dark">Loans</Link></li>
          </ul>
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-info me-2 fw-bold">Log In</Link>
            <Link to="/signup" className="btn btn-success fw-bold">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
);

export default Navbar;