import React from "react";
// 🛑 Use BrowserRouter (aliased as Router) and include useLocation for Layout component
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


/**
 * Helper component to render Navbar and Footer conditionally.
 * This replaces the fragments in your original code.
 */
const Layout = ({ children }) => {
    const location = useLocation();
    
    // Define paths where the Navbar and Footer should be hidden (e.g., chat/admin screens)
    // 🛑 Note: This is a design choice. Adjust the paths as needed.
    const hiddenPaths = [
        '/chat', 
        '/admin/add-companion' 
    ]; 
    
    // Check if the current path STARTS with any hidden path segments
    const hideNavbarFooter = hiddenPaths.some(path => location.pathname.startsWith(path));

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Conditionally render Navbar */}
            {!hideNavbarFooter && <Navbar />}

            {/* Main content area that grows */}
            <main className="flex-grow-1">
                {children}
            </main>

            {/* Conditionally render Footer */}
            {!hideNavbarFooter && <Footer />}
        </div>
    );
};


const App = () => {
    return (
        // 🛑 Use Router (aliased BrowserRouter) as the wrapper
        <Router> 
            <Layout>
                <Routes>
                    {/* Home & Planner */}
                    <Route path="/" element={<Home />} />
                    <Route path="/planner" element={<PlannerForm />} />
                    <Route path="/itinerary" element={<ItineraryDisplay />} />

                    {/* Loan Section */}
                    <Route path="/loan" element={<TravelLoanScreen />} />
                    <Route path="/loan/apply" element={<LoanApplicationScreen />} />
                    <Route path="/loan/submitted" element={<LoanApplicationScreen />} />
                    <Route path="/loan/approved" element={<LoanApproval />} />

                    {/* Companion Finder & Chat */}
                    <Route path="/companions" element={<CompanionFinder />} />
                    {/* Note: /companions/profile/:id is required for a specific profile */}
                    <Route path="/companions/profile/:id" element={<CompanionProfile />} />
                    {/* Note: /chat/:id is required for a specific chat room */}
                    <Route path="/chat/:id" element={<ChatScreen />} /> 
                    
                    {/* Admin/New Companion Form */}
                    <Route path="/admin/add-companion" element={<AddCompanionForm />} />

                </Routes>
            </Layout>
        </Router>
    );
};

export default App;