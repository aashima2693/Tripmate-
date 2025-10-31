import React, { useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { PiPackageLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { StoreContext } from '../contexts/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    
    // 🛑 CRITICAL FIX: Destructure required values and remove unused/redundant ones.
    // user and isLoggedIn are unused in the provided JSX logic, which relies on 'token'.
    // We only need token and setToken.
    const { token, setToken } = useContext(StoreContext); 

    const logout = () => {
        // Logically, 'token' should be cleared in local storage first
        localStorage.removeItem('token');
        // Update the context state to reflect the logout
        setToken("");
        // Redirect the user to the home page
        navigate('/');
    };

    // 🛑 CRITICAL FIX: JSX must be explicitly returned from the functional component.
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand navbar-brand-gradient">TripMate</Link>
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
                        <li className="nav-item"><Link to="/" className="nav-link text-dark">Home</Link></li>
                        <li className="nav-item"><Link to="/companions" className="nav-link text-dark">Companions</Link></li>
                        <li className="nav-item"><Link to="/loan" className="nav-link text-dark">Loans</Link></li>
                    </ul>

                    {/* Authentication/Profile Logic based on 'token' */}
                    {!token ? (
                        <div className='btn btn-signin' onClick={() => setShowLogin(true)}>
                            Sign In
                        </div>
                    ) : (
                        <div className='navbar-profile'>
                            <IoPersonSharp size={28} className='profile-icon' />
                            <ul className="nav-profile-dropdown">
                                {/* <li><PiPackageLight className='dropdown-icons' color="#fa5c1c" /><p>Orders</p></li> */}
                                <hr />
                                {/* 🛑 Call the logout function on click */}
                                <li onClick={logout}>
                                    <IoIosLogOut className='dropdown-icons' color="#fa5c1c" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;