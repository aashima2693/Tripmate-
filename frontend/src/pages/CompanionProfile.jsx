// src/pages/CompanionProfile.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { companionData } from '../data/Companions'; // Ensure correct path

const CompanionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState('connect'); // 'connect' | 'pending' | 'connected' 

  const companion = useMemo(() => 
    companionData.find(c => c.id === parseInt(id))
  , [id]);

  const handleSendRequest = () => {
    setRequestStatus('pending');
    setTimeout(() => {
        console.log(`${companion.name} accepted the request!`);
        setRequestStatus('connected');
    }, 5000); // 5-second delay for demo acceptance
  };

  const buttonProps = useMemo(() => {
    // Define the navigation function for the chat button
    const handleChatNavigation = () => {
        navigate(`/chat/${companion.id}`); 
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
          onClick: handleChatNavigation // Navigates to chat
        };
      case 'connect':
      default:
        return {
          text: 'Send a Connection Request',
          variant: 'primary', 
          disabled: false,
          icon: null,
          onClick: handleSendRequest // Triggers simulation
        };
    }
  }, [requestStatus, companion?.name, companion?.id, navigate]);
  
  // Mock check for the current user's verification status
  const currentUserIsVerified = true; 
  
  if (!companion) {
    return (
      <Container className="my-5 text-center">
        <h2>Companion Not Found 😔</h2>
        <Button variant="primary" onClick={() => navigate('/companions')}>Go Back to Finder</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="card-gradient-blue-green text-white p-3 rounded-top-4">
          <Row className="align-items-center">
            <Col><h2 className="mb-0 fw-bold text-white">{companion.name}'s Profile</h2></Col>
            <Col xs="auto"><Button variant="light" onClick={() => navigate(-1)} className="fw-bold">&larr; Back to Finder</Button></Col>
          </Row>
        </Card.Header>
        
        <Card.Body className="p-5">
          <Row>
            {/* Left Column (Image & Info) */}
            <Col md={4} className="text-center mb-4 mb-md-0 border-end">
              <Card.Img 
                src={companion.image} 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                className="rounded-circle mb-3 border border-4 border-primary shadow-sm"
                alt={`${companion.name} profile`}
              />
              <h3 className="mb-0 text-dark fw-bold">{companion.name}</h3>
              <p className="text-muted fst-italic">{companion.age} years old</p>
              {companion.verified && (
                <Badge bg="success" className="p-2 fw-medium">
                  <i className="bi bi-patch-check-fill me-1"></i> Verified Traveler
                </Badge>
              )}
            </Col>
            
            {/* Right Column (Details and Button) */}
            <Col md={8}>
              <h4 className="text-primary border-bottom pb-2 mb-3 fw-bold">About Me</h4>
              <p className="lead text-dark">{companion.bio}</p>
              
              <h4 className="text-primary border-bottom pb-2 my-3 fw-bold">Trip Details & Interests</h4>
              <p className="mb-2">**Destination:** <Badge bg="info" className="p-2">{companion.destination}</Badge></p>
              
              <div>
                <p>**Interests:**</p>
                {companion.interests.map(interest => (<Badge key={interest} bg="secondary" className="me-2 mb-1 p-2">{interest}</Badge>))}
              </div>
              <div className="mt-3">
                <p>**Available Months:**</p>
                {companion.availableMonths.map(month => (<Badge key={month} bg="secondary" className="me-2 mb-1 p-2">{month}</Badge>))}
              </div>
              
              {/* Conditional Connection Button */}
              {currentUserIsVerified ? (
                <Button 
                  variant={buttonProps.variant} 
                  className="mt-4 fw-bold w-100 btn-lg shadow"
                  onClick={buttonProps.onClick} 
                  disabled={buttonProps.disabled}
                >
                  {buttonProps.icon}
                  {buttonProps.text}
                </Button>
              ) : (
                 <Link to="/verification-screen" className="d-grid mt-4">
                    <Button variant="warning" className="fw-bold w-100 btn-lg shadow">
                       ⚠️ Verify Your Identity to Connect (KYC Required)
                    </Button>
                 </Link>
              )}
              {/* Status Message */}
              {requestStatus === 'pending' && <p className="text-center text-secondary mt-2"><small>Waiting for {companion.name} to accept...</small></p>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CompanionProfile;