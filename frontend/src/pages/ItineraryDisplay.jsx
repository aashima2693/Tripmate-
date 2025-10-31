import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaLeaf,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

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
      className={`me-2 ${
        color === "green" ? "text-success" : "text-primary"
      }`}
      size={16}
    />
    <span
      className={`fw-medium ${
        color === "green" ? "text-success" : "text-primary"
      }`}
    >
      {text}
    </span>
  </div>
);

const ItineraryDisplay = () => {
  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,198,255,0.15) 0%, rgba(0,114,255,0.15) 100%)",
      }}
    >
      <Container fluid className="py-5">
        {/* Header Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="fw-bold text-primary mb-2">Your AI-Crafted Adventure</h2>
            <p className="text-muted fs-5">5 Days of Exploration & Discovery</p>
          </Col>
        </Row>

        {/* Map and Overview */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <div
                className="d-flex align-items-center justify-content-center bg-light text-muted"
                style={{ height: "250px", borderRadius: "10px" }}
              >
                [Map View Placeholder]
              </div>
            </Card>
          </Col>
        </Row>

        {/* Daily Itinerary */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <Card className="border-0 shadow-sm p-4 rounded-4">
              <h4 className="fw-bold text-dark mb-3">
                Day 1{" "}
                <Badge bg="success" className="ms-2">
                  Arrival & City Discovery
                </Badge>
              </h4>
              <ul className="list-unstyled">
                <DailyActivity
                  time="Morning"
                  description="Check into Eco-Stay & Local Market Visit"
                />
                <DailyActivity
                  time="Evening"
                  description="Evening Cultural Show & Dinner"
                />
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Smart Recommendations */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <h4 className="fw-bold text-dark mb-3">Smart Recommendations</h4>
            <Row xs={1} md={2} className="g-3">
              <Col>
                <RecommendationChip
                  Icon={FaLeaf}
                  text="Eco-Friendly Travel: High 🌿 (Oct–Mar)"
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
                  text="Best Time to Book: 3 Weeks Prior"
                  color="blue"
                />
              </Col>
              <Col>
                <RecommendationChip
                  Icon={FaStar}
                  text="Local Cuisine Rating 4.5/5"
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
