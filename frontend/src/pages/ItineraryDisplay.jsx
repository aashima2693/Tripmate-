// src/pages/ItineraryDisplay.jsx
import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaLeaf, FaClock, FaStar } from 'react-icons/fa';

// --- Reusable Component Helpers (Defined within ItineraryDisplay for brevity)

const DailyActivity = ({ time, description }) => (
    <li className="flex items-start mb-3">
        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={16} />
        <div>
            <p className="font-semibold text-gray-800">{time}</p>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </li>
);

const RecommendationChip = ({ Icon, text, color }) => (
    <div className={`flex items-center p-3 rounded-lg shadow-sm border ${color === 'green' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} text-sm`}>
        <Icon className={`mr-2 ${color === 'green' ? 'text-green-500' : 'text-blue-500'}`} size={16} />
        <span className={`${color === 'green' ? 'text-green-700' : 'text-blue-700'}`}>{text}</span>
    </div>
);

// --- Main Itinerary Display Component ---

const ItineraryDisplay = () => {
    return (
        <div className="h-screen bg-white overflow-y-auto">
            
            {/* Header (Map Section) - Dark/Gradient Background */}
            <header className="bg-gray-900 text-white pt-4 pb-2 relative">
                <div className="flex justify-between items-center px-4 mb-4">
                    <span className="text-2xl cursor-pointer">✕</span> {/* Close/Back icon */}
                    <span className="text-2xl cursor-pointer">👤</span> {/* Profile icon */}
                </div>
                
                {/* AI-Crafted Title Card Overlay */}
                <div className="bg-white p-5 rounded-t-3xl shadow-xl border-b-4 border-green-500">
                    <h1 className="text-gray-800 text-xl font-bold mb-1">Your AI-Crafted Adventure:</h1>
                    <p className="text-green-600 text-3xl font-extrabold">5 Days of Exploration</p>
                </div>
                
                {/* Mock Map Background - Using a green-to-blue gradient to represent the map area */}
                <div className="absolute top-0 left-0 w-full h-full opacity-70 z-0 
                            bg-gradient-to-br from-green-500 to-blue-500" 
                            style={{height: '50%'}} // Adjust height as needed
                ></div>
                <div className="relative z-10 p-5 pt-10" style={{ minHeight: '150px' }}>
                    {/* Placeholder for map image or actual map component */}
                    <div className="h-24 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold">
                        [Map View Placeholder]
                    </div>
                </div>

            </header>

            <main className="p-5 pt-0">
                
                {/* Day 1 Itinerary */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Day 1 <span className="text-green-500 font-normal text-lg">| Arrival & City Discovery</span></h2>
                    
                    <ul className="list-none p-0 space-y-4">
                        <DailyActivity 
                            time="Morning" 
                            description="Check into Eco-Stay & Local Market Visit"
                        />
                        <DailyActivity 
                            time="Evening" 
                            description="Evening Cultural Show & Dinner"
                        />
                    </ul>
                </section>

                {/* Smart Recommendations */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Smart Recomendations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RecommendationChip 
                            Icon={FaLeaf} 
                            text="Eco-Friendly Travel: High 🌿 Oct–Mar" 
                            color="green"
                        />
                        <RecommendationChip 
                            Icon={FaShieldAlt} 
                            text="Local Safety Score 4.8/5" 
                            color="blue"
                        />
                        <RecommendationChip 
                            Icon={FaClock} 
                            text="Best Time to Book: 3 Weeks Prior" 
                            color="blue"
                        />
                        <RecommendationChip 
                            Icon={FaStar} 
                            text="Local Cuisine Rating 4.5/5" 
                            color="green"
                        />
                    </div>
                </section>

            </main>

            {/* Sticky Footer Button */}
            <footer className="sticky bottom-0 bg-white p-5 border-t border-gray-100 shadow-lg">
                <button 
                    className="w-full py-3 rounded-xl text-white font-bold transition-all duration-300
                    bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg shadow-green-300"
                >
                    Customize Itinerary
                </button>
            </footer>

        </div>
    );
};

export default ItineraryDisplay;