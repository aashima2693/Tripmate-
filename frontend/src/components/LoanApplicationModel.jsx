// src/components/LoanApplicationModal.jsx
import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert, InputGroup } from 'react-bootstrap';

// --- Step 1: Personal & KYC Details (Your current screen) ---
const StepOne = ({ formData, handleChange }) => (
    <Form>
        <p className="text-primary fw-bold">Step 1 of 3: Personal & KYC Details</p>
        <Row className="mb-3">
            <Col>
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="fullName" value={formData.fullName || ''} onChange={handleChange} required />
            </Col>
            <Col>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" type="email" value={formData.email || ''} onChange={handleChange} required />
            </Col>
        </Row>
        <Row className="mb-4">
            <Col>
                <Form.Label>Aadhaar / PAN Number</Form.Label>
                <Form.Control name="identityNumber" value={formData.identityNumber || ''} onChange={handleChange} required />
            </Col>
            <Col className="d-flex align-items-end">
                <Form.Check
                    type="checkbox"
                    label={<span>I agree to the <a href="#terms">Terms and Conditions</a>.</span>}
                    required
                />
            </Col>
        </Row>
    </Form>
);

// --- Step 2: Income Details (The New Step) ---
const StepTwoIncome = ({ formData, handleChange }) => (
    <Form>
        <p className="text-primary fw-bold">Step 2 of 3: Income Details</p>
        <Row className="mb-3">
            <Col>
                <Form.Label>Employment Status</Form.Label>
                <Form.Select name="employmentStatus" value={formData.employmentStatus || ''} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option>Salaried</option>
                    <option>Self-Employed</option>
                    <option>Student / Other</option>
                </Form.Select>
            </Col>
            <Col>
                <Form.Label>Monthly Income (INR)</Form.Label>
                <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control name="monthlyIncome" type="number" value={formData.monthlyIncome || ''} onChange={handleChange} required />
                </InputGroup>
            </Col>
        </Row>
        <Row className="mb-4">
            <Col md={6}>
                <Form.Label>Mock Credit Score</Form.Label>
                <Form.Control type="text" value="780 (Excellent)" disabled />
                <Form.Text className="text-muted">
                    Mock data for hackathon demo.
                </Form.Text>
            </Col>
            <Col md={6}>
                <Form.Label>Proof of Income (Simulated)</Form.Label>
                <Form.Control type="file" disabled />
                <Form.Text className="text-muted">
                    Document upload is simulated.
                </Form.Text>
            </Col>
        </Row>
    </Form>
);

// --- Step 3: Loan Review & Submit ---
const StepThreeSubmit = ({ formData }) => (
    <div>
        <p className="text-primary fw-bold">Step 3 of 3: Review & Submit</p>
        <Alert variant="info">
            <p className="mb-1 fw-bold">Loan Details:</p>
            <ul className="list-unstyled mb-0">
                <li>Amount Requested: ₹50,000 (Fixed for demo)</li>
                <li>Term: 12 Months</li>
            </ul>
        </Alert>
        
        <p className="mt-3 fw-bold">Review Your Details:</p>
        <Row className="border-bottom py-1">
            <Col xs={4}>Name:</Col><Col>{formData.fullName}</Col>
        </Row>
        <Row className="border-bottom py-1">
            <Col xs={4}>Identity ID:</Col><Col>{formData.identityNumber}</Col>
        </Row>
        <Row className="border-bottom py-1">
            <Col xs={4}>Income:</Col><Col>₹{formData.monthlyIncome} ({formData.employmentStatus})</Col>
        </Row>
        <Alert variant="success" className="mt-4">
            All details look correct. Click 'Submit' to send your application for instant approval!
        </Alert>
    </div>
);


// --- Main Modal Component ---
const LoanApplicationModal = ({ show, handleClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ 
        fullName: 'Ankur', 
        email: 'goelankur631@gmail.com',
        identityNumber: '11232546'
    });
    
    // Simulate successful submission and close after delay
    const handleSubmit = () => {
        alert("Application Submitted! Simulating instant approval...");
        // In a real app, this would navigate to the LoanApproval.jsx screen
        setTimeout(handleClose, 1000); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepOne formData={formData} handleChange={handleChange} />;
            case 2: return <StepTwoIncome formData={formData} handleChange={handleChange} />;
            case 3: return <StepThreeSubmit formData={formData} />;
            default: return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
            <Modal.Header closeButton className="card-gradient-blue-green text-white">
                <Modal.Title className="text-white fw-bold">
                    Complete Your Loan Application
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderStep()}
            </Modal.Body>
            <Modal.Footer>
                {currentStep > 1 && (
                    <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                        &larr; Back
                    </Button>
                )}
                
                {currentStep < 3 ? (
                    <Button variant="success" onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === 1 && !formData.identityNumber}>
                        Proceed to {currentStep === 1 ? "Income Details" : "Review"}
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleSubmit} className="fw-bold">
                        Submit Application & Get Instant Approval
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default LoanApplicationModal;