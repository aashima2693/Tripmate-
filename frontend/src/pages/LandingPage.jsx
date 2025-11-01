// src/pages/LandingPage.jsx
import React, { useState } from "react";
import LoginModal from "../components/LoginModal.jsx";

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to TripMate</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          Login
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          Sign Up
        </button>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default LandingPage;
