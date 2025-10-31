// src/components/DestinationCard.jsx
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // If you want to link to a destination detail page later


const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  // You might want a full destination page later
  // const handleViewDetails = () => {
  //   navigate(`/destinations/${destination.id}`);
  // };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden destination-card">
      <Card.Img 
        variant="top" 
        src={destination.image} 
        alt={destination.name} 
        style={{ height: '180px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-dark mb-2">
          {destination.name}
          <span className="small text-muted ms-2">{`(${destination.bestTime})`}</span>
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1 mb-3">
          {destination.description}
        </Card.Text>
        <div className="mb-3">
          {destination.tags.map((tag, index) => (
            <Badge key={index} bg="info" className="me-2 mb-1 p-2 bg-opacity-75">{tag}</Badge>
          ))}
        </div>
        {/* Optional: Button to view more details */}
        {/* <Button variant="outline-primary" size="sm" className="mt-auto fw-bold" onClick={handleViewDetails}>
          View Details
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default DestinationCard;