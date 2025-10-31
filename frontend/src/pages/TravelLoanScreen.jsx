import React, { useState } from 'react';
import '../styles/TravelLoanScreen.css'; 
// Assuming Bootstrap's JavaScript is included globally in your project to handle the modal

// ----------------------------------------------------------------------
// NEW COMPONENT: ApplicationModal
// This modal will appear when the user clicks 'Apply Now'
// ----------------------------------------------------------------------
const ApplicationModal = ({ show, handleClose }) => {
    // Note: In a real app, you'd use separate states for different steps (e.g., Step 1: KYC, Step 2: Income, Step 3: Confirmation)
    if (!show) {
        return null;
    }

    return (
        // Using fixed positioning and backdrop for the modal effect
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content rounded-4 shadow-lg">
                    <div className="modal-header bg-primary text-white border-0 rounded-top-4">
                        <h5 className="modal-title fw-bold">Complete Your Loan Application</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <h6 className="mb-3 text-primary fw-bold">Step 1 of 3: Personal & KYC Details</h6>
                        
                        {/* Sample form fields for the application step */}
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" placeholder="John Doe" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control" placeholder="example@email.com" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Aadhaar / PAN Number</label>
                                    <input type="text" className="form-control" placeholder="Enter ID Proof Number" />
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="termsCheck" />
                                        <label className="form-check-label small" htmlFor="termsCheck">
                                            I agree to the <a href="#" className="text-primary fw-bold">Terms and Conditions</a>.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer border-0 p-4">
                        <button type="button" className="btn btn-secondary rounded-pill" onClick={handleClose}>Cancel</button>
                        <button type="button" className="btn apply-btn rounded-pill">Proceed to Income Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ----------------------------------------------------------------------

const TravelLoanScreen = () => {
    // State to control the visibility of the application modal
    const [showModal, setShowModal] = useState(false);

    const handleApplyNow = (e) => {
        e.preventDefault(); // Stop any default form submission/redirection
        setShowModal(true); // Open the application modal
    };

    const handleCloseModal = () => setShowModal(false);

    // --- Hero Section / Loan Application Widget ---
    const HeroSection = () => (
        // ... (existing HeroSection structure) ...
        <section className="hero-section text-white d-flex align-items-center py-5" 
                 style={{ backgroundImage: "url('path/to/travel-image.jpg')" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h1 className="display-4 fw-bold">Fund Your Dream Journey.</h1>
                        <p className="lead mb-4">Instant Travel Loans tailored for your next adventure. Fast approval, competitive rates.</p>
                        <div className="d-flex flex-wrap gap-3">
                            <span className="badge bg-light text-dark p-2 rounded-pill"><i className="bi bi-clock me-1"></i> Instant Approval</span>
                            <span className="badge bg-light text-dark p-2 rounded-pill"><i className="bi bi-currency-dollar me-1"></i> Competitive Rates</span>
                            <span className="badge bg-light text-dark p-2 rounded-pill"><i className="bi bi-wallet me-1"></i> Funds to Wallet</span>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        {/* Loan Application Card (Widget) */}
                        <div className="card p-4 shadow-lg rounded-4 loan-card">
                            <h2 className="h4 card-title mb-4 text-dark">Instant Travel Loan Application</h2>
                            
                            {/* The form structure remains the same */}
                            <form>
                                <div className="mb-3 input-group input-group-lg">
                                    <span className="input-group-text bg-light text-muted">₹</span>
                                    <input type="text" className="form-control" placeholder="Required Loan Amount" defaultValue="50,000" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="repaymentPeriod" className="form-label text-dark">Repayment Period</label>
                                    <select id="repaymentPeriod" className="form-select form-select-lg">
                                        <option>3 - 12 months</option>
                                        <option>13 - 24 months</option>
                                        <option>25 - 36 months</option>
                                    </select>
                                </div>
                                {/* **MODIFICATION HERE:** Call the custom handler */}
                                <button 
                                    type="submit" 
                                    className="btn btn-lg w-100 fw-bold rounded-pill shadow-sm apply-btn"
                                    onClick={handleApplyNow} 
                                >
                                    Apply Now
                                </button>
                            </form>
                            <small className="text-center mt-3 text-muted">Instant Approval (usually less than 5 mins)</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    // ... (HowItWorksSection and WhyTripMateSection remain the same) ...

    const HowItWorksSection = () => (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5 fw-bold text-dark">How It Works: 3 Simple Steps</h2>
                <div className="row text-center">
                    
                    {/* Step 1 */}
                    <div className="col-md-4 mb-4">
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100 step-card">
                            <i className="bi bi-pencil-square display-4 text-primary mb-3"></i> 
                            <h3 className="h5 fw-bold text-dark">1. Enter Details</h3>
                            <p className="text-muted">Fill out the quick online application form with your required details.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="col-md-4 mb-4">
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100 step-card">
                            <i className="bi bi-file-earmark-check display-4 text-primary mb-3"></i> 
                            <h3 className="h5 fw-bold text-dark">2. NBFC Approval</h3>
                            <p className="text-muted">Get **Instant Approval** from our NBFC partner. Quick and seamless.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="col-md-4 mb-4">
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100 step-card">
                            <i className="bi bi-wallet2 display-4 text-primary mb-3"></i> 
                            <h3 className="h5 fw-bold text-dark">3. Funds to TripMate Wallet</h3>
                            <p className="text-muted">Your loan is securely disbursed to your **TripMate Wallet** for travel payments.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );

    const WhyTripMateSection = () => (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-5 fw-bold text-dark">Why Choose TripMate Finance?</h2>
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="list-group list-group-flush shadow-lg rounded-3 overflow-hidden">
                            
                            {/* Feature 1 */}
                            <div className="list-group-item list-group-item-action d-flex align-items-center p-4">
                                <i className="bi bi-lightning-charge-fill h3 me-3 text-success"></i>
                                <div>
                                    <strong className="text-dark">Instant Approval</strong>
                                    <p className="mb-0 text-muted small">Application approval usually takes **less than 5 minutes**.</p>
                                </div>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="list-group-item list-group-item-action d-flex align-items-center p-4">
                                <i className="bi bi-percent h3 me-3 text-info"></i>
                                <div>
                                    <strong className="text-dark">Competitive Interest Rates</strong>
                                    <p className="mb-0 text-muted small">Affordable rates tailored to make your travel dreams a reality.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="list-group-item list-group-item-action d-flex align-items-center p-4">
                                <i className="bi bi-calendar-check-fill h3 me-3 text-warning"></i>
                                <div>
                                    <strong className="text-dark">Flexible Repayment Options</strong>
                                    <p className="mb-0 text-muted small">Choose a repayment period that suits your financial comfort.</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="travel-loan-page">
            <HeroSection />
            <HowItWorksSection />
            <WhyTripMateSection />
            
            {/* RENDER THE MODAL */}
            <ApplicationModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default TravelLoanScreen;