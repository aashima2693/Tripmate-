import React, { useState } from 'react';
import { Menu, Search, PiggyBank, ChevronDown, CheckCircle, HandCoins } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🛑 REQUIRED

// Define the core color palette
const ACCENT_COLOR = '#00bfa5'; // Teal
const LOAN_CARD_COLOR = '#4CAF50'; // Greenish hue from the image

// Component for a styled input field within the Loan Card
const LoanInputField = ({ label, value, onChange, currency = false, dropdown = false, placeholder }) => (
  <div>
    <label className="text-sm font-semibold text-white block mb-1">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 px-4 text-lg font-medium border-none focus:outline-none focus:ring-1 focus:ring-white rounded-lg text-gray-800"
      />
      {dropdown && (
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      )}
      {currency && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold text-gray-600">₹</span>
      )}
    </div>
  </div>
);


// Main App component for the TripMate Web Loan Application
const TravelLoanScreen = () => {
  const navigate = useNavigate(); // 🛑 Initialize hook
  const [loanAmount, setLoanAmount] = useState('50,000');
  const [loanTenure, setLoanTenure] = useState('3 - 12 months');
  
  const howItWorksSteps = [
    { icon: <CheckCircle className="w-5 h-5" style={{ color: ACCENT_COLOR }} />, text: '1. Enter Details' },
    { icon: <CheckCircle className="w-5 h-5" style={{ color: ACCENT_COLOR }} />, text: '2. NBFC Approval' },
    { icon: <CheckCircle className="w-5 h-5" style={{ color: ACCENT_COLOR }} />, text: '3. Funds to TripMate Wallet' },
  ];
  
  // 🛑 HANDLER TO NAVIGATE TO SUBMITTED SCREEN
  const handleApplyNow = () => {
    // Perform form submission logic here
    navigate('/loan/submitted'); 
  };

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
            <a href="#" className="font-bold text-teal-600 transition border-b-2 border-teal-600">Apply Loan</a>
            <a href="#" className="hover:text-teal-600 transition">Status</a>
            <a href="#" className="hover:text-teal-600 transition">Support</a>
          </nav>
          <button className="hidden md:block px-4 py-2 text-white font-semibold rounded-lg" style={{ backgroundColor: ACCENT_COLOR }}>
            My Account
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA: Loan Application Form */}
      <main className="flex-1 w-full max-w-6xl p-6 md:p-10 flex flex-col lg:flex-row gap-10">

        {/* LEFT COLUMN: Main Application Form and Details */}
        <div className="lg:w-2/3">
          
          {/* HEADER SECTION: Gradient Background for Title */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-8 text-white shadow-lg mb-8">
            <h2 className="text-4xl font-extrabold leading-tight">Instant Travel Loan</h2>
            <p className="text-xl font-light mt-1">Funding your dream journey, made easy.</p>
            
            <div className="flex items-center space-x-3 mt-4">
                <PiggyBank className="w-6 h-6 text-pink-300 fill-pink-500" />
                <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    NBFC Partnered
                </span>
            </div>
          </div>
          {/* END HEADER SECTION */}

          {/* Search/Filter Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search Financial Providers"
              className="w-full py-4 pl-12 pr-4 border-2 border-gray-300 rounded-xl focus:ring-[#00bfa5] focus:border-[#00bfa5] text-lg transition duration-150"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>

          {/* LOAN INPUT CARD - Green background from image */}
          <div className="p-8 rounded-xl shadow-xl mb-8" style={{ backgroundColor: LOAN_CARD_COLOR }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <LoanInputField
                  label="Required Loan Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  currency={true}
                />
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl font-extrabold text-white opacity-80 mr-4 hidden md:block">₹</span>
              </div>
              
              <LoanInputField
                label="Repayment Period"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                dropdown={true}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            className="w-full py-5 text-xl text-white font-bold rounded-xl shadow-lg transition duration-150 ease-in-out hover:shadow-xl hover:opacity-90 mt-4"
            style={{ backgroundColor: ACCENT_COLOR }}
            onClick={handleApplyNow} // 🛑 CALL THE NAVIGATION HANDLER
          >
            Apply Now
          </button>
        </div>

        {/* RIGHT COLUMN: How It Works & Information */}
        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
            <ul className="space-y-4">
                {howItWorksSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3 text-base text-gray-700">
                        {step.icon}
                        <p>{step.text}</p>
                    </li>
                ))}
                <li className="text-sm text-gray-500 pt-2 border-t mt-4 border-gray-100">
                    Your loan is disbursed securely into TripMate Wallet, ready for travel-related payments.
                </li>
            </ul>

            <div className='mt-8 pt-6 border-t border-gray-100'>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why TripMate?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li>- Instant Approval (usually less than 5 mins)</li>
                    <li>- Competitive Interest Rates</li>
                    <li>- Flexible Repayment Options</li>
                </ul>
            </div>
        </div>
      </main>

      {/* Global Footer (Placeholder) */}
      <footer className="w-full bg-white mt-12 py-6 border-t border-gray-100 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TripMate Finance. All rights reserved.
      </footer>
    </div>
  );
};

export default TravelLoanScreen;