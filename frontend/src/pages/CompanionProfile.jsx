import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { companionData } from '../data/Companions'; // Ensure correct path to your mock data

const CompanionProfile = () => {
    const { id } = useParams(); // 'id' from URL will be a string
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState('connect'); // 'connect' | 'pending' | 'connected' 

    // 🛑 CRITICAL FIX: Find companion by ID, ensuring type consistency
    const companion = useMemo(() => {
        // Use non-strict comparison (==) or convert c.id to string
        return companionData.find(c => String(c.id) === id); 
        // If your mock data has string IDs: return companionData.find(c => c.id === id);
    }, [id]);

    // Simulate sending a connection request
    const handleSendRequest = () => {
        setRequestStatus('pending');
        setTimeout(() => {
            console.log(`${companion.name} accepted the request!`);
            setRequestStatus('connected');
        }, 5000); // Simulate 5-second delay for acceptance
    };

    // Determine button state and text based on connection status
    const buttonProps = useMemo(() => {
        const handleChatNavigation = () => {
            navigate(`/chat/${companion.id}`); // Navigate to a chat page with companion ID
        };

        switch (requestStatus) {
            case 'pending':
                return {
                    text: 'Request Sent (Waiting for Acceptance...)',
                    variant: 'warning',
                    disabled: true,
                    icon: <Spinner animation="border" size="sm" className="me-2" />,
                    onClick: null,
                };
            case 'connected':
                return {
                    text: 'Continue to Chat 💬', 
                    variant: 'success', 
                    disabled: false,
                    icon: null,
                    onClick: handleChatNavigation, // Navigates to chat
                };
            case 'connect':
            default:
                return {
                    text: 'Send a Connection Request',
                    variant: 'primary', 
                    disabled: false,
                    icon: null,
                    onClick: handleSendRequest, // Triggers the connection simulation
                };
        }
    }, [requestStatus, companion?.name, companion?.id, navigate, handleSendRequest]);
    
    // Mock check for the current user's verification status (for UI demo)
    const currentUserIsVerified = true; // Set to false to test KYC message

    // Display if companion is not found
    if (!companion) {
        return (
            <Container className="my-5 text-center p-5">
                <h2 className="display-4 text-danger mb-4">Companion Not Found 😔</h2>
                <p className="lead text-muted">The profile you are looking for does not exist or the link is invalid.</p>
                <Button variant="primary" onClick={() => navigate('/companions')} className="mt-3 fw-bold btn-lg shadow-sm">
                    &larr; Go Back to Companion Finder
                </Button>
            </Container>
        );
    }

    // Main Profile View
    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                {/* Header with Back Button */}
                <Card.Header className="bg-primary text-white p-3 rounded-top-4">
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="mb-0 fw-bold text-white">{companion.name}'s Profile</h2>
                        </Col>
                        <Col xs="auto">
                            <Button variant="light" onClick={() => navigate(-1)} className="fw-bold d-flex align-items-center">
                                <i className="bi bi-arrow-left me-2"></i> Back to Finder
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                
                <Card.Body className="p-5">
                    <Row>
                        {/* Left Column: Image & Basic Info */}
                        <Col md={4} className="text-center mb-4 mb-md-0 border-end border-light">
                            <Card.Img 
                                src={companion.image} 
                                style={{ width: '180px', height: '180px', objectFit: 'cover' }} 
                                className="rounded-circle mb-3 border border-4 border-primary shadow-sm"
                                alt={`${companion.name} profile`}
                            />
                            <h3 className="mb-0 text-dark fw-bold">{companion.name}</h3>
                            <p className="text-muted fst-italic">{companion.age} years old</p>
                            {companion.verified && (
                                <Badge bg="success" className="p-2 fw-medium mt-2">
                                    <i className="bi bi-patch-check-fill me-1"></i> Verified Traveler
                                </Badge>
                            )}
                            <div className="mt-3">
                                <p className="text-muted small">From: {companion.startingLocation}</p>
                                <p className="text-muted small">Destination: {companion.destination}</p>
                            </div>
                        </Col>
                        
                        {/* Right Column: Detailed Bio & Interests */}
                        <Col md={8}>
                            <h4 className="text-primary border-bottom pb-2 mb-3 fw-bold">About {companion.name}</h4>
                            <p className="lead text-dark">{companion.bio}</p>
                            
                            <h4 className="text-primary border-bottom pb-2 my-3 fw-bold">Trip Details & Interests</h4>
                            
                            <div className="mb-3">
                                <p className="fw-medium mb-1">Interests:</p>
                                {companion.interests?.map(interest => ( // Use optional chaining for safety
                                    <Badge key={interest} bg="secondary" className="me-2 mb-1 p-2 rounded-pill">{interest}</Badge>
                                ))}
                            </div>
                            
                            <div className="mt-3">
                                <p className="fw-medium mb-1">Available Months:</p>
                                {companion.availableMonths?.map(month => ( // Use optional chaining for safety
                                    <Badge key={month} bg="info" className="me-2 mb-1 p-2 rounded-pill text-white">{month}</Badge>
                                ))}
                            </div>
                            
                            {/* Conditional Connection Button */}
                            {currentUserIsVerified ? (
                                <Button 
                                    variant={buttonProps.variant} 
                                    className="mt-4 fw-bold w-100 btn-lg shadow-sm d-flex align-items-center justify-content-center"
                                    onClick={buttonProps.onClick} 
                                    disabled={buttonProps.disabled}
                                >
                                    {buttonProps.icon}
                                    {buttonProps.text}
                                </Button>
                            ) : (
                                // KYC Required Message for unverified users
                                <Link to="/verification-screen" className="d-grid mt-4 text-decoration-none">
                                    <Button variant="danger" className="fw-bold w-100 btn-lg shadow-sm d-flex align-items-center justify-content-center">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i> 
                                        Verify Your Identity to Connect (KYC Required)
                                    </Button>
                                </Link>
                            )}
                            {requestStatus === 'pending' && (
                                <p className="text-center text-secondary mt-2 small">
                                    Waiting for {companion.name} to accept your request...
                                </p>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CompanionProfile;