import React from 'react';
import { Card, Ratio } from 'react-bootstrap';
// **Note:** You must have the standard Bootstrap CSS included in your project.

const DestinationCard = ({ name, image }) => {
  return (
    // The div wrapper is necessary for react-slick to manage slide width
    <div className="p-2">
      <Card 
        className="rounded-4 overflow-hidden shadow h-100 border-0" 
        style={{ cursor: 'pointer', transition: 'transform 0.3s', transform: 'scale(1)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* Use Ratio to enforce a 1:1 square aspect ratio for the card content */}
        <Ratio aspectRatio="1x1">
          {/* Card Body to hold the image and text */}
          <div className="position-relative">
            {/* Image */}
            
            <Card.Img
              src={image}
              alt={name}
              className="w-100 h-100 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
              }}
            />

            {/* Overlay for gradient effect and text - using standard Bootstrap positioning */}
            <div 
              className="position-absolute bottom-0 w-100 p-3 text-center text-white" 
              style={{
                // Custom gradient style to replace Tailwind's bg-gradient-to-t
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              }}
            >
              <Card.Title className="mb-0 fs-5 fw-bold text-shadow-lg">
                {name}
              </Card.Title>
            </div>
          </div>
        </Ratio>
      </Card>
    </div>
  );
};

export default DestinationCard;