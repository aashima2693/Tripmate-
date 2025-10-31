import React from 'react';
import { Modal, Button, Table, Badge, Row, Col, Alert } from 'react-bootstrap';

// Mock Amortization Schedule (using 8% annual interest for 12 months)
const RepaymentSchedule = [
    { month: 1, payment: 4333.33, interest: 333.33, principal: 4000.00, remaining: 46000.00 },
    { month: 2, payment: 4333.33, interest: 306.67, principal: 4026.66, remaining: 41973.34 },
    { month: 3, payment: 4333.33, interest: 279.82, principal: 4053.51, remaining: 37919.83 },
    { month: 4, payment: 4333.33, interest: 252.80, principal: 4080.53, remaining: 33839.30 },
    { month: 5, payment: 4333.33, interest: 225.59, principal: 4107.74, remaining: 29731.56 },
    { month: 6, payment: 4333.33, interest: 198.21, principal: 4135.12, remaining: 25596.44 },
    { month: 7, payment: 4333.33, interest: 170.64, principal: 4162.69, remaining: 21433.75 },
    { month: 8, payment: 4333.33, interest: 142.89, principal: 4190.44, remaining: 17243.31 },
    { month: 9, payment: 4333.33, interest: 114.95, principal: 4218.38, remaining: 13024.93 },
    { month: 10, payment: 4333.33, interest: 86.83, principal: 4246.50, remaining: 8778.43 },
    { month: 11, payment: 4333.33, interest: 58.52, principal: 4274.81, remaining: 4503.62 },
    { month: 12, payment: 4503.62, interest: 30.02, principal: 4473.60, remaining: 0.00 } // Final slightly adjusted payment
];

const LoanDocumentModal = ({ show, handleClose, loanAmount = 50000 }) => {
    // Calculate totals for summary (ensuring mock data strings are parsed)
    const loanAmountNum = parseFloat(loanAmount);
    const totalInterest = RepaymentSchedule.reduce((sum, item) => sum + item.interest, 0);
    const totalRepayment = (loanAmountNum + totalInterest);

    return (
        <Modal show={show} onHide={handleClose} size="xl" centered>
            <Modal.Header closeButton className="card-gradient-blue-green text-white">
                <Modal.Title className="text-white fw-bold">Loan Documents & Repayment Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4">
                    <Row className="text-center g-3">
                        <Col md={4}><h5 className="text-primary fw-bold">Loan Amount:</h5><p className="lead">₹{loanAmountNum.toLocaleString()}</p></Col>
                        <Col md={4}><h5 className="text-primary fw-bold">Interest Rate (Mock):</h5><p className="lead">8% p.a.</p></Col>
                        <Col md={4}><h5 className="text-primary fw-bold">Tenure:</h5><p className="lead">12 Months</p></Col>
                    </Row>
                    <Alert variant="info" className="mt-3">
                        <p className="mb-1 fw-bold">Total Repayment: ₹{totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="mb-0 small">Total Interest Paid: ₹{totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </Alert>
                </div>

                <h4 className="fw-bold mb-3">Amortization Schedule</h4>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr className="bg-light">
                                <th>#</th>
                                <th>Payment (EMI)</th>
                                <th>Principal Paid</th>
                                <th>Interest Paid</th>
                                <th>Remaining Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RepaymentSchedule.map(item => (
                                <tr key={item.month}>
                                    <td>{item.month}</td>
                                    <td className={item.month === 12 ? 'fw-bold' : ''}>₹{item.payment.toFixed(2)}</td>
                                    <td>₹{item.principal.toFixed(2)}</td>
                                    <td>₹{item.interest.toFixed(2)}</td>
                                    <td>
                                        {item.remaining > 0 ? `₹${item.remaining.toFixed(2)}` : <Badge bg="success">Paid Off</Badge>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className="mt-4 pt-3 border-top">
                    <h5 className="fw-bold">Key Terms Summary</h5>
                    <ul>
                        <li>**Payment Date:** Payments are due on the 5th of every month.</li>
                        <li>**Late Fee:** A penalty of 2% of the EMI amount will be charged for payments delayed by more than 7 days.</li>
                        <li>**NBFC Partner:** Loan issued by SecureTravel Finance Corp.</li>
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoanDocumentModal;
