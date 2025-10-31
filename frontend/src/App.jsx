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
import ChatScreen from "./pages/ChatScreen.jsx";

// ✅ Helper layout component
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavbarFooter && <Navbar />}

      <main className="flex-grow-1">{children}</main>

      {!hideNavbarFooter && <Footer />}
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
