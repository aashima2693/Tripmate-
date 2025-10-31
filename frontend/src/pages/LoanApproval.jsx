import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Check, CreditCard, HandCoins, Banknote } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/LoanApproval.css'; 

const LoanApproval = () => {
    // State to manage the animation phases: 'initial' | 'loading' | 'approved'
    const [approvalPhase, setApprovalPhase] = useState('initial'); 
    const navigate = useNavigate(); // Initialize navigate

    // Navigation Handler
    const handleBookTrip = () => {
        navigate('/planner'); // Redirects to the AI Trip Planner route (PlannerForm.jsx)
    };

    // MOCK: Simulate the approval process
    useEffect(() => {
        // Start the loading animation shortly after the page loads
        setApprovalPhase('loading');
        
        // Simulate the time required for approval (e.g., 3 seconds)
        const timer = setTimeout(() => {
            setApprovalPhase('approved');
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    const MOCK_LOAN_AMOUNT = '50,000';
    const MOCK_WALLET_AMOUNT = '50,000'; 

    const renderApprovalStatus = () => {
        const circleStyles = { width: '110px', height: '110px' };

        if (approvalPhase === 'loading') {
            return (
                <div className="status-circle-outer status-loading rounded-circle shadow-lg d-flex justify-content-center align-items-center"
                     style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                    <div className="status-circle-inner rounded-circle shadow-lg d-flex justify-content-center align-items-center"
                         style={circleStyles}>
                        <Spinner animation="border" variant="secondary" style={{ width: '60px', height: '60px' }} />
                    </div>
                </div>
            );
        }

        return (
            <div className={`status-circle-outer status-approved rounded-circle shadow-lg d-flex justify-content-center align-items-center`}
                 style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                <div className="status-circle-inner rounded-circle shadow-lg d-flex justify-content-center align-items-center"
                     style={circleStyles}>
                    <Check size={90} className="next-step-icon final-check" /> 
                </div>
            </div>
        );
    };

    return (
        <div className="loan-approval-page d-flex flex-column"> 

            {/* TOP SECTION: Gradient Background (Full Width) */}
            <header className="card-gradient-blue-green text-center py-5 py-md-5 d-flex flex-column align-items-center justify-content-center">
                <Container>
                    <div className="text-white mb-4">
                        <h2 className="display-4 fw-bolder">
                            {approvalPhase === 'approved' ? "Congratulations!" : "Processing Application..."}
                        </h2>
                        <p className="lead fw-light fs-3">
                            {approvalPhase === 'approved' ? "Your Travel Loan is Approved." : "Please wait a moment."}
                        </p>
                    </div>

                    {renderApprovalStatus()}
                </Container>
            </header>
            {/* END TOP SECTION */}

            {/* MAIN CONTENT AREA */}
            <main className="flex-grow-1 w-100 py-5 py-md-5">
                <Container style={{ maxWidth: '960px' }}>
                    
                    {/* Content only renders if approved */}
                    {approvalPhase === 'approved' && (
                        <>
                            {/* Wallet Balance Summary */}
                            <div className="mb-5 p-4 rounded-3 shadow wallet-summary">
                                <h3 className="fs-5 fw-bold text-dark mb-3 d-flex align-items-center">
                                    <Banknote size={24} className="me-3 next-step-icon" />
                                    TripMate Wallet Balance
                                </h3>
                                <div className="d-flex align-items-baseline mb-2">
                                    <span className="fs-1 fw-bold me-2 wallet-balance">₹</span>
                                    <span className="display-3 fw-bolder wallet-balance">{MOCK_WALLET_AMOUNT}</span>
                                </div>
                                <p className="fs-6 text-muted">Your travel funds (Loan amount: ₹{MOCK_LOAN_AMOUNT}) are now available in your wallet.</p>
                            </div>

                            {/* Action Buttons */}
                            <Row className="g-3 mb-5">
                                <Col md={6}>
                                    <Button 
                                        size="lg" 
                                        className="w-100 py-3 fw-bold shadow-lg btn-book-trip"
                                        onClick={handleBookTrip} // <-- CORRECTED: Use handler here
                                    >
                                        Book My Trip Now
                                    </Button>
                                </Col>
                                <Col md={6}>
                                    <Button size="lg" className="w-100 py-3 fw-bold border-2 btn-view-wallet" variant="outline-success">View Wallet Details</Button>
                                </Col>
                            </Row>

                            {/* Loan Status/Next Steps */}
                            <div className="mt-4 pt-4 border-top border-gray-200">
                                <h4 className="fs-5 fw-bold text-dark mb-4">What's Next?</h4>
                                
                                <ul className="list-unstyled">
                                    <li className="d-flex align-items-start mb-3">
                                        <Check size={24} className="me-3 mt-1 flex-shrink-0 next-step-icon" />
                                        <div><span className="fw-bold text-dark">Funds Secured:</span> The full amount is available in your TripMate Wallet.</div>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <CreditCard size={24} className="me-3 mt-1 flex-shrink-0 next-step-icon" />
                                        <div><span className="fw-bold text-dark">Use Anywhere:</span> Spend directly from the wallet for flights, hotels, and travel expenses.</div>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <HandCoins size={24} className="me-3 mt-1 flex-shrink-0 next-step-icon" />
                                        <div><span className="fw-bold text-dark">Repayment Schedule:</span> Check your repayment schedule below.</div>
                                    </li>
                                </ul>
                                
                                <div className="text-center pt-4">
                                    <a href="#" className="fs-5 fw-bold text-decoration-none next-step-icon"onClick={handleShowDocuments}>View Detailed Loan Documents</a>
                                </div>
                            </div>
                        </>
                    )}
                </Container>
            </main>
            <footer className="bg-light text-center py-4 mt-auto border-top">
                <Container><p className="mb-0 text-muted">&copy; {new Date().getFullYear()} TripMate Finance. All rights reserved.</p></Container>
            </footer>
        </div>
    );
};

export default LoanApproval;