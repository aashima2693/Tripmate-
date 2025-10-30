import React from 'react';
import { Menu, Check, HandCoins, CreditCard, Banknote } from 'lucide-react';

// Define the core color palette
const ACCENT_COLOR = '#00bfa5'; // Teal

// Main App component for the TripMate Web Loan Page
const LoanApproval = () => {
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
            <a href="#" className="hover:text-teal-600 transition">Loans</a>
            <a href="#" className="hover:text-teal-600 transition">Wallet</a>
            <a href="#" className="hover:text-teal-600 transition">Support</a>
          </nav>
          <button className="hidden md:block px-4 py-2 text-white font-semibold rounded-lg" style={{ backgroundColor: ACCENT_COLOR }}>
            My Account
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA: Centered card mimicking the mobile screen design */}
      <main className="flex-1 w-full max-w-4xl p-6 md:p-10">

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          
          {/* TOP SECTION: Gradient Background (Title and Status) */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 pt-1 flex flex-col items-center p-12">
            
            {/* Main Title Block */}
            <div className="text-white text-center mb-6">
              <h2 className="text-4xl font-extrabold leading-snug">Congratulations!</h2>
              <p className="text-2xl font-light">Your Travel Loan is Approved.</p>
              </div>

            {/* Approved Status Circle */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Outer border (simulated) */}
              <div className="w-full h-full rounded-full border-4 border-white border-opacity-70 flex items-center justify-center">
                {/* Inner solid circle */}
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-16 h-16" style={{ color: ACCENT_COLOR }} />
                </div>
              </div>
            </div>
          </div>
          {/* END TOP SECTION */}

          {/* Wallet Balance & Actions - White content area */}
          <div className="bg-white p-8 md:p-12">
            
            {/* Wallet Balance Summary */}
            <div className="mb-8 p-6 border border-teal-100 rounded-xl bg-teal-50 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Banknote className="w-6 h-6 mr-3" style={{ color: ACCENT_COLOR }} />
                TripMate Wallet Balance
              </h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold mr-3" style={{ color: ACCENT_COLOR }}>₹</span>
                <span className="text-6xl font-extrabold" style={{ color: ACCENT_COLOR }}>50,000</span>
              </div>
              <p className="text-base text-gray-600">Your travel funds are now available in your wallet.</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                className="w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition duration-150 ease-in-out hover:shadow-xl flex items-center justify-center"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Book My Trip Now
              </button>
              <button
                className="w-full py-4 text-lg font-bold rounded-xl border-2 transition duration-150 ease-in-out hover:bg-teal-50 flex items-center justify-center"
                style={{ color: ACCENT_COLOR, borderColor: ACCENT_COLOR }}
              >
                View Wallet Details
              </button>
            </div>

            {/* Loan Status/Next Steps */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-lg font-semibold text-gray-800 mb-4">What's Next?</p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-gray-700">
                  <Check className="w-6 h-6 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                  <div>
                    <span className="font-semibold">Funds Secured:</span> The full amount is available in your TripMate Wallet.
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-gray-700">
                  <CreditCard className="w-6 h-6 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                  <div>
                    <span className="font-semibold">Use Anywhere:</span> Spend directly from the wallet for flights, hotels, and travel expenses.
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-gray-700">
                  <HandCoins className="w-6 h-6 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                  <div>
                    <span className="font-semibold">Repayment Schedule:</span> Check your repayment schedule below.
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

        </div>

        {/* Footer Link (moved inside the main content for visibility) */}
        <div className="p-4 mt-8 text-center">
          <a href="#" className="text-lg font-bold hover:underline" style={{ color: ACCENT_COLOR }}>
            View Detailed Loan Documents
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

export default LoanApproval;