// src/components/CompanionCard.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import the CSS file if you use modules, e.g., import '../../styles/Companion.css';

const CompanionCard = ({ companion }) => {
  const navigate = useNavigate();

  const handleConnect = () => {
    // Navigates to the profile page
    navigate(`/companions/profile/${companion.id}`);
  };

  return (
    // 'companion-card' class hooks into the CSS for the hover effect
    <Card className="shadow-sm companion-card h-100 border-0 rounded-3">
      <div className="text-center p-3">
        <Card.Img 
          variant="top" 
          src={companion.image} 
          style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
          className="rounded-circle border border-3 border-info" 
          alt={`${companion.name} profile`}
        />
      </div>
      <Card.Body className="text-center d-flex flex-column">
        <Card.Title className="mb-1">
          **{companion.name}**
          {companion.verified && (
            <span title="Verified User" className="ms-2 text-success">
              <i className="bi bi-patch-check-fill"></i>
            </span>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted fst-italic">{companion.age} years old</Card.Subtitle>
        
        <div className="mt-2 mb-3">
          {companion.interests.slice(0, 3).map(interest => (
            <Badge key={interest} bg="secondary" className="me-1 mb-1 bg-opacity-75">{interest}</Badge>
          ))}
        </div>

        <p className="text-truncate px-2" style={{ maxHeight: '2.8rem' }}>{companion.bio}</p>

        <Button 
          variant="info" 
          className="mt-auto fw-bold" 
          onClick={handleConnect}
        >
          Connect
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CompanionCard;