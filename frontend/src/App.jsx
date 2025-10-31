import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TravelLoanScreen from "./pages/TravelLoanScreen.jsx";
import LoanApplicationScreen from "./pages/LoanApplicationScreen.jsx";
import LoanApproval from "./pages/LoanApproval.jsx";
import PlannerForm from "./pages/PlannerForm.jsx";
import ItineraryDisplay from "./pages/ItineraryDisplay.jsx";
import CompanionFinder from "./pages/CompanionFinder.jsx";
import CompanionProfile from "./pages/CompanionProfile.jsx";
import ChatScreen from './pages/ChatScreen.jsx';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Trip Planner */}
          <Route path="/planner" element={<PlannerForm />} />
          <Route path="/itinerary" element={<ItineraryDisplay />} />

          {/* Loan Section */}
          <Route path="/loan" element={<TravelLoanScreen />} />
          <Route path="/loan/apply" element={<LoanApplicationScreen />} />
          <Route path="/loan/submitted" element={<LoanApplicationScreen />} />
          <Route path="/loan/approved" element={<LoanApproval />} />

          {/* Travel Companion Finder */}
          <Route path="/companions" element={<CompanionFinder />} />
          <Route path="/companions/profile/:id" element={<CompanionProfile />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
