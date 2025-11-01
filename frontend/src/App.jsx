import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import PlannerForm from "./pages/PlannerForm.jsx";
import ItineraryDisplay from "./pages/ItineraryDisplay.jsx";
import TravelLoanScreen from "./pages/TravelLoanScreen.jsx";
import LoanApplicationScreen from "./pages/LoanApplicationScreen.jsx";
import LoanApproval from "./pages/LoanApproval.jsx";
import CompanionFinder from "./pages/CompanionFinder.jsx";
import CompanionProfile from "./pages/CompanionProfile.jsx";
import ChatScreen from './pages/ChatScreen.jsx';
import AddCompanionForm from "./components/AddCompanionForm.jsx";  

const App = () => { 
    return (
        // 1. Set up flex container for sticky footer behavior
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter>
                
                {/* 2. ADDED THE NAVBAR HERE */}
                <Navbar /> 

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavbarFooter && <Navbar />}

      <main className="flex-grow-1">{children}</main>

                        {/* Loan Section */}
                        {/* /loan is the main page with the APPLY button */}
                        <Route path="/loan" element={<TravelLoanScreen />} /> 
                        {/* /loan/apply handles the initial form in the modal, but the next screen is the one below */}
                        <Route path="/loan/apply" element={<LoanApplicationScreen />} /> 
                        {/* /loan/submitted is the screen that shows "Reviewing..." */}
                        <Route path="/loan/submitted" element={<LoanApplicationScreen />} /> 
                        {/* /loan/approved is the final screen */}
                        <Route path="/loan/approved" element={<LoanApproval />} />

                        {/* Travel Companion Finder */}
                        <Route path="/companions" element={<CompanionFinder />} />
                        <Route path="/companions/profile/:id" element={<CompanionProfile />} />
                        <Route path="/chat/:id" element={<ChatScreen />} />

                        <Route path="/admin/add-companion" element={<AddCompanionForm />} />

                    </Routes>
                </main>
                
                {/* 4. Footer is rendered outside Routes and below <main> */}
                <Footer />
                
            </BrowserRouter>
        </div>
    );
};

const App = () => {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
};

export default App;
