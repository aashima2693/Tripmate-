import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
// 🛑 NOTE: Ensure these imports point to the correct files in your project:
import { createCompanionProfile } from '../services/api/companionApi';
import { interestsList, destinationList, locationList } from '../data/Companions'; 

const AddCompanionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: 25,
        destination: destinationList[0] || '',
        startingLocation: locationList[0] || '',
        interests: [],
        availableMonths: [],
        bio: '',
        image: 'https://picsum.photos/seed/new/150', // Mock image for new user
        verified: false,
    });
    const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Handle checkbox inputs (Interests and Months)
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked 
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value),
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple client-side validation
        if (!formData.name || formData.interests.length === 0 || !formData.bio) {
            setErrorMsg("Please fill out Name, Bio, and select at least one Interest.");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        try {
            // Call the Firebase service function to add the profile
            const newId = await createCompanionProfile(formData);
            
            setStatus('success');
            
            // Clear the form after successful submission
            setFormData({
                name: '', age: 25, destination: destinationList[0], startingLocation: locationList[0],
                interests: [], availableMonths: [], bio: '', 
                image: `https://picsum.photos/seed/${newId}/150`, 
                verified: false,
            });

        } catch (error) {
            console.error("Submission failed:", error);
            setErrorMsg(error.message || "An unknown error occurred during submission.");
            setStatus('error');
        }
    };

    return (
        <Container className="my-5">
            <Card className="shadow-lg p-4 rounded-4 border-0">
                <Card.Title as="h2" className="fw-bold mb-4 text-primary">Add New Companion Profile</Card.Title>

                {/* Status Alerts */}
                {status === 'success' && <Alert variant="success" onClose={() => setStatus(null)} dismissible>Profile added successfully! It will now appear in the finder.</Alert>}
                {status === 'error' && <Alert variant="danger" onClose={() => setStatus(null)} dismissible>{errorMsg}</Alert>}

                <Form onSubmit={handleSubmit}>
                    
                    {/* Name and Age Row */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formName">
                                <Form.Label className="fw-medium">Name</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formAge">
                                <Form.Label className="fw-medium">Age</Form.Label>
                                <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="99" />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Destination and Location Row */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formDestination">
                                <Form.Label className="fw-medium">Destination</Form.Label>
                                <Form.Select name="destination" value={formData.destination} onChange={handleChange} required>
                                    {destinationList.map(dest => <option key={dest} value={dest}>{dest}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formStartingLocation">
                                <Form.Label className="fw-medium">Starting Location</Form.Label>
                                <Form.Select name="startingLocation" value={formData.startingLocation} onChange={handleChange} required>
                                    {locationList.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Bio */}
                    <Form.Group controlId="formBio" className="mb-3">
                        <Form.Label className="fw-medium">Bio (max 150 chars)</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="bio" 
                            value={formData.bio} 
                            onChange={handleChange} 
                            maxLength={150} 
                            required 
                        />
                    </Form.Group>

                    {/* Interests Checkboxes */}
                    <Form.Group controlId="formInterests" className="mb-4">
                        <Form.Label className="d-block fw-medium">Interests (Select all that apply)</Form.Label>
                        <div className="d-flex flex-wrap gap-2 border p-3 rounded bg-light">
                            {interestsList.map(interest => (
                                <Form.Check
                                    key={interest}
                                    type="checkbox"
                                    name="interests"
                                    id={`interest-${interest}`}
                                    label={interest}
                                    value={interest}
                                    checked={formData.interests.includes(interest)}
                                    onChange={handleChange}
                                    inline
                                />
                            ))}
                        </div>
                    </Form.Group>
                    
                    {/* Optional: Available Months Checkboxes */}
                    <Form.Group controlId="formAvailableMonths" className="mb-4">
                        <Form.Label className="d-block fw-medium">Available Months</Form.Label>
                        <div className="d-flex flex-wrap gap-2 border p-3 rounded bg-light">
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                                <Form.Check
                                    key={month}
                                    type="checkbox"
                                    name="availableMonths"
                                    id={`month-${month}`}
                                    label={month}
                                    value={month}
                                    checked={formData.availableMonths.includes(month)}
                                    onChange={handleChange}
                                    inline
                                />
                            ))}
                        </div>
                    </Form.Group>


                    <Button variant="primary" type="submit" disabled={status === 'loading'} className="w-100 fw-bold btn-lg">
                        {status === 'loading' ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Adding Profile...
                            </>
                        ) : 'Save New Companion'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AddCompanionForm;