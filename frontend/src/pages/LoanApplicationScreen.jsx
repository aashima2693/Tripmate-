import React, { useEffect } from 'react'; // 🛑 NEW: Import useEffect
import { Menu, Clock, Check, HandCoins } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🛑 REQUIRED: Import useNavigate

// Define the core color palette
const ACCENT_COLOR = '#00bfa5'; // Teal
const LIGHT_ACCENT = '#4dd0e1'; // Cyan for gradient stop

// Main App component for the TripMate Web Loan Page (Application Submitted Status)
const LoanApplicationScreen = () => {
const navigate = useNavigate(); // 🛑 Initialize hook

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/loan/approved');
        }, 3000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        // Outer Container for the entire website view
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
        {/* GLOBAL HEADER: Full-width top navigation */}
            <header className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Menu className="w-6 h-6 text-gray-700 md:hidden" />
                    <h1 className="text-2xl font-extrabold text-gray-900">TripMate <span className='text-sm font-medium text-gray-500'>Finance</span></h1>
                </div>
                <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
                    <a href="#" className="hover:text-teal-600 transition">Apply Loan</a>
                    <a href="#" className="hover:text-teal-600 transition">Wallet</a>
                    <a href="#" className="hover:text-teal-600 transition">Support</a>
                </nav>
                <button className="hidden md:block px-4 py-2 text-white font-semibold rounded-lg" style={{ backgroundColor: ACCENT_COLOR }}>
                    My Account
                </button>
            </div>
            </header>

        {/* MAIN CONTENT AREA: Centered status card */}
        <main className="flex-1 w-full max-w-4xl p-6 md:p-10">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* TOP SECTION: Gradient Background (Title and Status) */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 pt-1 flex flex-col items-center p-12">
                    {/* Main Title Block */}
                    <div className="text-white text-center mb-6">
                        <h2 className="text-4xl font-extrabold leading-snug">Application Submitted!</h2>
                        <p className="text-xl font-light mt-1">We are reviewing your request.</p>
                    </div>

                    {/* Status Indicator (Clock / Reviewing) */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Outer dashed border simulating the animation */}
                        <div className="absolute w-full h-full rounded-full border-4 border-dashed border-white border-opacity-70 animate-spin-slow"></div>
                            {/* Inner solid circle */}
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <Clock className="w-16 h-16" style={{ color: ACCENT_COLOR }} />
                            </div>
                        </div>
                        <p className="text-white text-base mt-4">Reviewing your application...</p>
                    </div>
                    {/* END TOP SECTION */}

                    {/* Review Details & Next Steps - White content area */}
                    <div className="bg-white p-8 md:p-12">
                        {/* Review Message Card */}
                        <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                            <p className="text-base text-gray-700 leading-relaxed">
                                Your instant travel loan request is being reviewed by our NBFC partner. This usually takes **less than 5 minutes**. Please stay on this page or check back shortly.
                            </p>
                        </div>

                    {/* How It Works (Status Tracker) */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-lg font-semibold text-gray-800 mb-4">Application Progress</p>
                    <ul className="space-y-3">
                        <li className="flex items-center space-x-3 text-gray-700">
                            <Check className="w-6 h-6 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                            <span className="font-semibold">1. Enter Details</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-700">
                            <Clock className="w-6 h-6 flex-shrink-0 text-yellow-500" />
                            <span className="font-semibold">2. NBFC Approval (In Progress)</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-500">
                            <HandCoins className="w-6 h-6 flex-shrink-0" />
                            <span>3. Funds to TripMate Wallet (Pending)</span>
                        </li>
                    </ul>
                    </div>
                </div>

            </div>

                    {/* Footer Link */}
                    <div className="p-4 mt-8 text-center">
                        <a href="#" className="text-lg font-bold hover:underline" style={{ color: ACCENT_COLOR }}>
                            View Loan Details
                        </a>
                    </div>
            </main>

                    {/* Global Footer (Placeholder) */}
                    <footer className="w-full bg-white mt-12 py-6 border-t border-gray-100 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} TripMate Finance. All rights reserved.
                    </footer>
        </div>
    );
};

export default LoanApplicationScreen;