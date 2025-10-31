import React, { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaShieldAlt,
    FaLeaf,
    FaClock,
    FaStar,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const DailyActivity = ({ time, description }) => (
    <li className="d-flex align-items-start mb-3">
        <FaCheckCircle className="text-success mt-1 me-3" size={16} />
        <div>
            <p className="fw-semibold mb-0 text-dark">{time}</p>
            <p className="text-muted small mb-0">{description}</p>
        </div>
    </li>
);

const RecommendationChip = ({ Icon, text, color }) => (
    <div
        className={`d-flex align-items-center p-3 rounded-3 border shadow-sm ${
            color === "green"
                ? "bg-success-subtle border-success-subtle"
                : "bg-primary-subtle border-primary-subtle"
        }`}
    >
        <Icon
            className={`me-2 ${color === "green" ? "text-success" : "text-primary"}`}
            size={16}
        />
        <span
            className={`fw-medium ${color === "green" ? "text-success" : "text-primary"}`}
        >
            {text}
        </span>
    </div>
);

const ItineraryDisplay = () => {
    const location = useLocation();
    
    // 🛑 FIX 1: Extract the correctly passed data from state: `location.state.itinerary`
    const passedItinerary = location.state?.itinerary || []; 
    
    // We no longer need the loading state since the data is passed directly
    const [itinerary, setItinerary] = useState(passedItinerary); 
    const [loading, setLoading] = useState(passedItinerary.length === 0);

    // 🛑 FIX 2: Replace the unnecessary API call with a check for passed data
    useEffect(() => {
        if (passedItinerary.length > 0) {
            setItinerary(passedItinerary);
            setLoading(false);
        } else {
            // Handle case where user navigates here directly without form submission
            console.error("No itinerary data passed through state.");
            setLoading(false);
            setItinerary([]);
        }
    }, [passedItinerary]); // Depend on the itinerary data passed via navigation state

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div
            className="min-vh-100"
            style={{
                background:
                    "linear-gradient(180deg, rgba(0,198,255,0.15) 0%, rgba(0,114,255,0.15) 100%)",
            }}
        >
            <Container fluid className="py-5">
                {/* Header */}
                <Row className="justify-content-center text-center mb-5">
                    <Col md={8}>
                        <h2 className="fw-bold text-primary mb-2">Your AI-Crafted Itinerary</h2>
                        <p className="text-muted fs-5">
                            Tailored suggestions based on your preferences
                        </p>
                    </Col>
                </Row>

                {/* Itinerary Results */}
                {itinerary.length > 0 ? (
                    itinerary.map((spot, index) => (
                        <Row className="justify-content-center mb-4" key={index}>
                            <Col md={8}>
                                <Card className="border-0 shadow-sm p-4 rounded-4">
                                    <h5 className="fw-bold text-dark mb-2 d-flex align-items-center">
                                        <FaMapMarkerAlt className="text-primary me-2" />
                                        {spot.spot_name} — <span className="ms-2 text-muted">{spot.city}</span>
                                    </h5>
                                    <p className="text-muted mb-2">
                                        Category: <strong>{spot.category}</strong>
                                    </p>
                                    <p className="mb-0">
                                        {/* Now using lower-case properties from the cleaned Python output */}
                                        ⭐ Rating: <strong>{spot.rating}</strong> | 🎟️ Entry Fee: ₹
                                        {spot.entry_fee} 
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    ))
                ) : (
                    <p className="text-center text-muted fs-5">No recommendations found. Adjust your search criteria.</p>
                )}

                {/* Smart Recommendations */}
                <Row className="justify-content-center mb-5 mt-5">
                    <Col md={8}>
                        <h4 className="fw-bold text-dark mb-3">Smart Recommendations</h4>
                        <Row xs={1} md={2} className="g-3">
                            <Col>
                                <RecommendationChip
                                    Icon={FaLeaf}
                                    text="Eco-Friendly Travel: Recommended 🌿"
                                    color="green"
                                />
                            </Col>
                            <Col>
                                <RecommendationChip
                                    Icon={FaShieldAlt}
                                    text="Local Safety Score 4.8/5"
                                    color="blue"
                                />
                            </Col>
                            <Col>
                                <RecommendationChip
                                    Icon={FaClock}
                                    text="Best Time to Visit: Oct–Mar"
                                    color="blue"
                                />
                            </Col>
                            <Col>
                                <RecommendationChip
                                    Icon={FaStar}
                                    text="Cuisine Rating: 4.6/5"
                                    color="green"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Footer Button */}
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <Button
                            variant="success"
                            className="fw-bold px-5 py-3 rounded-pill"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(0,198,255,1) 0%, rgba(0,114,255,1) 100%)",
                                border: "none",
                            }}
                        >
                            Customize Itinerary
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ItineraryDisplay;