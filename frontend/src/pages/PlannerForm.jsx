import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";       // 🛑 Import StoreContext
// Ensure this path to your API service is correct
import { getAIItinerary } from "../services/api"; 
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    ListGroup,
    Spinner // Assuming Spinner is used in the loading state
} from "react-bootstrap";
import { FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlannerForm = () => {
    const navigate = useNavigate();
    // 🛑 Get the authentication token from the context
    const { token } = useContext(StoreContext); 

    const [formData, setFormData] = useState({
        budget: "",
        destination: "", 
        interests: [], 
        duration_days: "", 
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading indicator

    const interestOptions = [
        "Adventure", "Nature", "Culture", "Beach", "Wildlife", 
        "History", "Shopping", "Food", "Nightlife", "Relaxation",
    ];
    
    // --- API Logic for Destination Suggestions (Unchanged) ---
    const fetchSuggestions = async (query) => {
        if (!query.trim()) { setSuggestions([]); return; }
        // NOTE: Using a hardcoded key—must be secured in a production environment
        try {
            const response = await axios.get(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${query}`,
                {
                    headers: {
                        "X-RapidAPI-Key": "69211009d5mshbe5c3162f6dc730p1d8f33jsn3ca0f1fece09", 
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                    },
                }
            );
            const cities = response?.data?.data?.map((city) => `${city.city}, ${city.country}`) || [];
            setSuggestions(cities);
        } catch (error) {
            console.error("GeoDB API error:", error.response?.data || error.message);
            setSuggestions([]);
        }
    };

    // Debounce the search input
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchSuggestions(formData.destination);
        }, 400);
        return () => clearTimeout(delay);
    }, [formData.destination]);


    // --- Form Handlers ---
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === 'destination') {
            setShowSuggestions(true);
        }
    };

    const handleSelectSuggestion = (city) => {
        setFormData((prev) => ({ ...prev, destination: city }));
        setShowSuggestions(false);
    };

    const handleInterestToggle = (interest) => {
        setFormData((prev) => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛑 AUTHENTICATION CHECK
        if (!token) {
            alert("Please log in to use the AI Itinerary Planner.");
            return;
        }

        const duration =
            startDate && endDate
                ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
                : parseInt(formData.duration_days) || 1; 

        // Basic validation check
        if (!formData.budget || !formData.destination || duration < 1 || formData.interests.length === 0) {
            alert("Please fill out Budget, Destination, Duration, and select at least one Interest.");
            return;
        }

        setLoading(true);

        const requestBody = {
            budget: parseFloat(formData.budget),
            duration_days: duration,
            interests: formData.interests.join(", "),
            destination: formData.destination,
        };

        try {
            // 🛑 PASS TOKEN: The API service must accept and use this token
            const itinerary = await getAIItinerary(requestBody, token); 
            
            navigate("/itinerary", { state: { itinerary } }); 
        } catch (error) {
            console.error("Error fetching itinerary:", error); 
            // The API service should throw the message from the backend error response
            alert(`Failed to generate itinerary. Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Component JSX ---
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
                <h2 className="text-center fw-bold mb-4">Plan Your Adventure</h2>

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
                                    onChange={(e) => handleChange("budget", e.target.value)}
                                    className="ps-4 py-3"
                                    required
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
                                            if (endDate && date > endDate) setEndDate(null);
                                        }}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="From"
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control me-2 py-3"
                                        required={!formData.duration_days}
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
                                        required={!!startDate}
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
                                onChange={(e) => handleChange("destination", e.target.value)}
                                onFocus={() => formData.destination && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                className="ps-4 py-3"
                                required
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
                        <h6 className="fw-bold text-muted mb-2">Select Your Interests</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {interestOptions.map((interest) => (
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

                    {/* 🚀 Submit */}
                    <div className="text-center mt-5">
                        <Button
                            type="submit"
                            className="fw-bold px-5 py-3 rounded-pill"
                            disabled={loading}
                            style={{
                                backgroundColor: "#00c6ff",
                                border: "none",
                                fontSize: "18px",
                            }}
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Crafting Itinerary...
                                </>
                            ) : (
                                "Craft My Itinerary with AI"
                            )}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default PlannerForm;