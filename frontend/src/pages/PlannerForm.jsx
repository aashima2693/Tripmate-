// ✅ PlannerForm.jsx (Vite + React + Bootstrap + GeoDB API)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import {
  FaRupeeSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlannerForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    budget: "",
    destination: "",
    interests: [],
    ecoFriendly: true,
    petFriendly: true,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const interestsList = [
    "Mountains & Trekking",
    "Culture of Heritage",
    "Solo Nightlife",
    "Food Travel",
  ];

  // ✅ Fetch destination suggestions from GeoDB API
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
        setSuggestions([]);
        return;
    }

    try {
        const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${query}`,
        {
            headers: {
            "X-RapidAPI-Key": "5a70cab0ccmsh30e1dba28d3b9f3p111870jsnc4c654ac9010", // 🔑 replace with your key
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
        }
        );

        // ✅ Safely handle missing or unexpected data
        const cities =
        response?.data?.data?.map(
            (city) => `${city.city}, ${city.country}`
        ) || [];

        setSuggestions(cities);
    } catch (error) {
        console.error("GeoDB API error:", error.response?.data || error.message);
        setSuggestions([]);
    }
    };


  // Debounce destination input
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions(formData.destination);
    }, 400);
    return () => clearTimeout(delay);
  }, [formData.destination]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const alreadySelected = prev.interests.includes(interest);
      return {
        ...prev,
        interests: alreadySelected
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSelectSuggestion = (city) => {
    setFormData((prev) => ({ ...prev, destination: city }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", {
        ...formData,
        startDate,
        endDate,
    });
    navigate("/itinerary");
    };


  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #00c6ff, #0072ff)",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <Container
        className="bg-white shadow-lg p-5 rounded-4"
        style={{ maxWidth: "800px" }}
      >
        <h2 className="text-center fw-bold mb-4">
          Plan Your Adventure
        </h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            {/* 💰 Budget */}
            <Col md={6}>
              <div className="position-relative">
                <FaRupeeSign
                  className="position-absolute top-50 translate-middle-y text-muted"
                  style={{ left: "10px" }}
                />
                <Form.Control
                  type="number"
                  placeholder="Budget"
                  value={formData.budget}
                  onChange={(e) =>
                    handleChange("budget", e.target.value)
                  }
                  className="ps-4 py-3"
                />
              </div>
            </Col>

            {/* 📅 Dates */}
            <Col md={6}>
              <div className="position-relative">
                <FaCalendarAlt
                  className="position-absolute top-50 translate-middle-y text-muted"
                  style={{ left: "10px", zIndex: "2" }}
                />
                <div className="d-flex ps-4">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (endDate && date > endDate)
                        setEndDate(null);
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="From"
                    dateFormat="dd/MM/yyyy"
                    className="form-control me-2 py-3"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="To"
                    dateFormat="dd/MM/yyyy"
                    className="form-control py-3"
                  />
                </div>
              </div>
            </Col>

            {/* 📍 Destination */}
            <Col md={12} className="position-relative">
              <FaMapMarkerAlt
                className="position-absolute top-50 translate-middle-y text-muted"
                style={{ left: "10px" }}
              />
              <Form.Control
                type="text"
                placeholder="Enter Destination"
                value={formData.destination}
                onChange={(e) =>
                  handleChange("destination", e.target.value)
                }
                onFocus={() =>
                  formData.destination && setShowSuggestions(true)
                }
                onBlur={() =>
                  setTimeout(() => setShowSuggestions(false), 150)
                }
                className="ps-4 py-3"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ListGroup
                  className="position-absolute w-100 shadow-sm mt-1 rounded"
                  style={{ zIndex: 5, maxHeight: "200px", overflowY: "auto" }}
                >
                  {suggestions.map((city, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      onClick={() => handleSelectSuggestion(city)}
                      className="py-2"
                    >
                      {city}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
          </Row>

          {/* 🎯 Interests */}
          <div className="mt-4">
            <h6 className="fw-bold text-muted mb-2">Interests</h6>
            <div className="d-flex flex-wrap gap-2">
              {interestsList.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  variant={
                    formData.interests.includes(interest)
                      ? "success"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleInterestToggle(interest)}
                  className="rounded-pill px-3 py-2"
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          {/* ♻️ Toggles */}
          <Row className="mt-4">
            <Col
              md={6}
              className="d-flex justify-content-between align-items-center"
            >
              <span>Eco-Friendly Options</span>
              <Form.Check
                type="switch"
                id="eco-friendly"
                checked={formData.ecoFriendly}
                onChange={() =>
                  handleChange("ecoFriendly", !formData.ecoFriendly)
                }
              />
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-between align-items-center"
            >
              <span>Pet-Friendly</span>
              <Form.Check
                type="switch"
                id="pet-friendly"
                checked={formData.petFriendly}
                onChange={() =>
                  handleChange("petFriendly", !formData.petFriendly)
                }
              />
            </Col>
          </Row>

          {/* 🚀 Submit */}
          <div className="text-center mt-5">
            <Button
            onClick={handleSubmit}
              type="submit"
              className="fw-bold px-5 py-3 rounded-pill"
              style={{
                backgroundColor: "#00c6ff",
                border: "none",
                fontSize: "18px",
              }}
            >
              Craft My Itinerary with AI
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PlannerForm;
