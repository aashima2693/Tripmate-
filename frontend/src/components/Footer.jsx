// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa'; // Requires react-icons/fa

const Footer = () => (
    <footer className="bg-dark text-white-50 py-5 mt-auto border-top border-info border-3">
        <Container>
            <Row className="g-4">
                
                {/* Column 1: Brand and Social Media */}
                <Col md={4} lg={3}>
                    <h5 className="text-white fw-bold mb-3 navbar-brand-gradient">TripMate</h5>
                    <p className="small">Your ultimate partner for travel planning, financing, and finding companions.</p>
                    <div className="d-flex gap-3 fs-5">
                        <a href="https://facebook.com" className="text-white-50 hover-white" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://twitter.com" className="text-white-50 hover-white" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://instagram.com" className="text-white-50 hover-white" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </Col>

                {/* Column 2: Quick Links (Features) */}
                <Col md={4} lg={3}>
                    <h5 className="text-white fw-bold mb-3">Features</h5>
                    <ul className="list-unstyled">
                        <li className="mb-2"><Link to="/companions" className="text-white-50 small text-decoration-none">Find a Companion</Link></li>
                        <li className="mb-2"><Link to="/loan" className="text-white-50 small text-decoration-none">Travel Loan</Link></li>
                        <li className="mb-2"><Link to="/planner-form" className="text-white-50 small text-decoration-none">AI Trip Planner</Link></li>
                        <li className="mb-2"><a href="#" className="text-white-50 small text-decoration-none">Approved Projects</a></li>
                    </ul>
                </Col>

                {/* Column 3: Legal & Support */}
                <Col md={4} lg={3}>
                    <h5 className="text-white fw-bold mb-3">Support</h5>
                    <ul className="list-unstyled">
                        <li className="mb-2"><a href="#" className="text-white-50 small text-decoration-none">FAQ & Help Center</a></li>
                        <li className="mb-2"><a href="#" className="text-white-50 small text-decoration-none">Terms & Conditions</a></li>
                        <li className="mb-2"><a href="#" className="text-white-50 small text-decoration-none">Privacy Policy</a></li>
                        <li className="mb-2"><a href="#" className="text-white-50 small text-decoration-none">Contact Us</a></li>
                    </ul>
                </Col>
                
                {/* Column 4: App Status (Hackathon Touch) */}
                <Col md={12} lg={3}>
                    <h5 className="text-white fw-bold mb-3">App Status</h5>
                    <div className="d-flex align-items-center mb-2">
                        <span className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                        <span className="small text-white">All Systems Operational</span>
                    </div>
                    <p className="small text-muted mb-0">Server uptime: 99.99%</p>
                    <p className="small text-muted">Version: 1.0 (Hackathon Build)</p>
                </Col>

            </Row>

            <Row className="mt-4 border-top border-secondary pt-3">
                <Col className="text-center small text-white-50">
                    &copy; {new Date().getFullYear()} TripMate. All rights reserved.
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;