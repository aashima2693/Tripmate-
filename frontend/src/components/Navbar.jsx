import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { StoreContext } from "../contexts/StoreContext";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);

  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand navbar-brand-gradient">
            TripMate
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto fw-medium">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/companions" className="nav-link text-dark">
                  Companions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/loan" className="nav-link text-dark">
                  Loans
                </Link>
              </li>
            </ul>

            {/* ✅ Show Login OR Profile / Logout */}
            {!token ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary px-3"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="navbar-profile position-relative">
                <IoPersonSharp size={28} className="profile-icon" />
                <ul className="nav-profile-dropdown shadow-sm">
                  <hr className="my-1" />
                  <li
                    onClick={logout}
                    className="d-flex align-items-center px-3 py-2"
                    style={{ cursor: "pointer" }}
                  >
                    <IoIosLogOut
                      className="dropdown-icons me-2"
                      color="#fa5c1c"
                    />
                    <p className="mb-0">Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Login Modal */}
      <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
