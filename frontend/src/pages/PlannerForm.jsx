// src/pages/PlannerForm.jsx (UPDATED)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🛑 NEW IMPORT: For redirection
import { FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// --- Reusable Component Helpers (No Change) ---
// ... InputField, ChipButton, CheckboxToggle definitions remain the same ...

const InputField = ({ label, placeholder, Icon }) => (
    <div className="mb-4">
        <label className="text-gray-600 text-sm font-semibold block mb-1">{label}</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white">
            <Icon className="text-gray-400 mr-3" size={20} />
            <input 
                type="text"
                placeholder={placeholder}
                className="w-full text-gray-800 focus:outline-none placeholder-gray-500"
            />
        </div>
    </div>
);

const ChipButton = ({ label, isSelected, onClick }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 
            ${isSelected 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
    >
        {label}
    </button>
);

const CheckboxToggle = ({ label, isChecked, onChange }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
        <label className="text-gray-700 font-semibold">{label}</label>
        <button
            onClick={onChange}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isChecked ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}></div>
        </button>
    </div>
);


// --- Main Planner Form Component ---

const PlannerForm = () => {
    // Hooks initialization
    const navigate = useNavigate(); // 🛑 INITIALIZE REDIRECTION HOOK
    const [selectedInterests, setSelectedInterests] = useState(['Culture of Heritage']);
    const [isEcoFriendly, setIsEcoFriendly] = useState(false);
    const [isPetFriendly, setIsPetFriendly] = useState(true);

    const toggleInterest = (interest) => {
        setSelectedInterests(prev => 
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    // 🛑 NEW HANDLER: Submits form (data handling ignored for now) and redirects
    const handlePlanSubmit = () => {
        // PUSHBACK: This is where you would call your MERN backend API 
        // using 'fetch' or 'axios' to send the form data.
        console.log("Submitting form data..."); 
        
        // After simulated successful submission, redirect to the results page
        navigate('/itinerary'); 
    };
    
    // Handler for the top-left 'X' button
    const handleClose = () => {
        navigate('/'); // Go back to the Home page
    };


    return (
        <div className="h-screen bg-gray-50 overflow-y-auto">
            
            <header className="bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <span 
                    className="text-2xl cursor-pointer"
                    onClick={handleClose} // 🛑 ADDED CLICK HANDLER
                >
                    ✕
                </span>
                <h1 className="text-lg font-semibold">Plan Your Adventure</h1>
                <span className="w-6"></span>
            </header>

            <main className="p-5">
                
                {/* Inputs Section */}
                {/* ... (input fields) ... */}
                <section className="mb-8">
                    <InputField label="Budget" placeholder="Enter budget range" Icon={FaMoneyBillWave} />
                    <InputField label="Dates" placeholder="Select start and end dates" Icon={FaCalendarAlt} />
                    <InputField label="Destination" placeholder="Explorational Regions & Sites" Icon={FaMapMarkerAlt} />
                </section>

                {/* Interests Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Mountains & Trekking', 'Culture of Heritage', 'Solo Nightlife', 'Food Travel'].map(interest => (
                            <ChipButton 
                                key={interest}
                                label={interest}
                                isSelected={selectedInterests.includes(interest)}
                                onClick={() => toggleInterest(interest)}
                            />
                        ))}
                    </div>
                </section>

                {/* Toggles Section */}
                <section className="mb-8 p-4 bg-white rounded-xl shadow-sm">
                    <CheckboxToggle label="Eco-Friendly Options" isChecked={isEcoFriendly} onChange={() => setIsEcoFriendly(prev => !prev)} />
                    <CheckboxToggle label="Pet-Friendly" isChecked={isPetFriendly} onChange={() => setIsPetFriendly(prev => !prev)} />
                </section>

            </main>

            {/* Sticky Footer Button */}
            <footer className="sticky bottom-0 bg-white p-5 border-t border-gray-100 shadow-lg">
                <button 
                    onClick={handlePlanSubmit} // 🛑 USE NEW HANDLER
                    className="w-full py-3 rounded-xl text-white font-bold transition-all duration-300
                    bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg shadow-green-300"
                >
                    Craft My Itinerary with AI
                </button>
            </footer>

        </div>
    );
};

export default PlannerForm;