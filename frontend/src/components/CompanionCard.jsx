import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CompanionCard = ({ companion }) => {
    // 🛑 CRITICAL CHECK: If the companion object itself is missing, return null early to prevent a crash.
    if (!companion) {
        console.error("CompanionCard rendered without companion prop.");
        return null;
    }
    
    const navigate = useNavigate();
    
    // Ensure the ID is always a string and present for navigation and keys.
    // Use .id (local mock) or fallback to something else, though for local mock, .id should exist.
    const companionId = companion.id ? String(companion.id) : null; 
    
    // Ensure interests is always an array for mapping
    const interestsToShow = Array.isArray(companion.interests) ? companion.interests : [];

    const handleConnect = () => {
        if (companionId) {
            navigate(`/companions/profile/${companionId}`);
        } else {
            console.error("Navigation failed: Companion ID is invalid.");
        }
    }

    return (
        <Card className="shadow-sm companion-card h-100 border-0 rounded-3">
            <div className="text-center p-3">
                <Card.Img 
                    variant="top" 
                    // 🛑 Defensive check on image URL
                    src={companion.image || 'path/to/placeholder.jpg'} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                    className="rounded-circle border border-3 border-info" 
                    alt={`${companion.name || 'Unknown'} profile`} 
                />
            </div>
            <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="mb-1">
                    {/* 🛑 Defensive access using optional chaining (or || '') */}
                    <strong>{companion.name || 'N/A'}</strong>
                    {companion.verified && (<span title="Verified User" className="ms-2 text-success"><i className="bi bi-patch-check-fill"></i></span>)}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted fst-italic">{companion.age || '?' } years old</Card.Subtitle>
                
                {/* Map over the guaranteed array */}
                <div className="mt-2 mb-3">
                    {interestsToShow.slice(0, 3).map(interest => (
                        <Badge key={interest} bg="secondary" className="me-1 mb-1 bg-opacity-75">{interest}</Badge>
                    ))}
                </div>
                
                <p className="text-truncate px-2" style={{ maxHeight: '2.8rem' }}>{companion.bio || 'No bio available'}</p>
                
                <Button 
                    variant="info" 
                    className="mt-auto fw-bold" 
                    onClick={handleConnect} 
                    // Disable button if ID is somehow missing
                    disabled={!companionId} 
                >
                    Connect
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CompanionCard;