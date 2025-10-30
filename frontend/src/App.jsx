import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TravelLoanScreen from './pages/TravelLoanScreen.jsx'; 
import LoanApplicationScreen from './pages/LoanApplicationScreen.jsx';
import LoanApproval from './pages/LoanApproval.jsx';
import PlannerForm from './pages/PlannerForm.jsx';
import ItineraryDisplay from './pages/ItineraryDisplay.jsx';
import CompanionFinder from "./pages/CompanionFinder.jsx";
import CompanionProfile from "./pages/CompanionProfile.jsx";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/planner" element={<PlannerForm />} />
                    <Route path="/itinerary" element={<ItineraryDisplay />} />
                    <Route path="/loan" element={<TravelLoanScreen />} />
                    <Route path="/loan/apply" element={<TravelLoanScreen />} />
                    <Route path="/loan/submitted" element={<LoanApplicationScreen />} />
                    <Route path="/loan/approved" element={<LoanApproval />} />
                    <Route path="/companions" element={<CompanionFinder />} />
                    <Route path="/companions/:id" element={<CompanionProfile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;