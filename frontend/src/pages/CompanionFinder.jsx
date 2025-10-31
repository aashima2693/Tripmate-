// src/pages/CompanionFinder.jsx

import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Card, Form, InputGroup } from 'react-bootstrap';
import CompanionCard from '../components/CompanionCard';
import { 
  companionData, 
  getAgeRange, 
  interestsList, 
  ageRanges, 
  availableMonths,
  destinationList,
  locationList
} from '../data/Companions';

const CompanionFinder = () => {
  const [filters, setFilters] = useState({
    destination: 'All Destinations',
    location: 'All Locations',
    age: 'All Ages',
    interest: 'All Interests',
    month: 'All Dates',
    search: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredCompanions = useMemo(() => {
    const searchTerm = filters.search.toLowerCase();
    
    return companionData.filter(companion => {
      
      // 1. Destination Filter Check
      const destinationMatch = filters.destination === 'All Destinations' || companion.destination === filters.destination;
      
      // 2. Location Filter Check (New Feature)
      const locationMatch = filters.location === 'All Locations' || companion.startingLocation === filters.location; 
      
      // 3. Age Filter Check
      const ageMatch = filters.age === 'All Ages' || getAgeRange(companion.age) === filters.age;
      
      // 4. Interest Filter Check
      const interestMatch = filters.interest === 'All Interests' || companion.interests.includes(filters.interest);
      
      // 5. Month Filter Check
      const monthMatch = filters.month === 'All Dates' || companion.availableMonths.includes(filters.month);
      
      // 6. Search Check
      const searchMatch = companion.name.toLowerCase().includes(searchTerm) || companion.bio.toLowerCase().includes(searchTerm);

      // COMBINED RETURN: MUST match ALL criteria
      return destinationMatch && locationMatch && ageMatch && interestMatch && monthMatch && searchMatch;
    });
  }, [filters]);

  return (
    <Container className="my-5">
      
      {/* Modern Gradient Header Banner */}
      <Card className="mb-5 shadow-lg border-0 hero-gradient-bg">
        <Card.Body className="text-center py-4">
          <h1 className="fw-bolder m-0 text-white">🌍 Find Your TripMate</h1>
          <p className="m-0 fs-5 text-white opacity-75">Connect with travelers heading to the **same destination** and starting near you.</p>
        </Card.Body>
      </Card>

      {/* Filter and Search Bar (Responsive Layout) */}
      <div className="p-3 mb-4 rounded-4 shadow-sm" style={{ backgroundColor: 'var(--color-white)' }}>
        <Row className="g-3 align-items-center">
          
          {/* Search Input */}
          <Col lg={3} md={12}>
            <InputGroup>
              <InputGroup.Text id="search-icon" className="bg-light border-end-0"><i className="bi bi-search"></i></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by Name, Interests, or Bio..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="shadow-none border-start-0"
              />
            </InputGroup>
          </Col>

          {/* Filters (Compact Layout) */}
          <Col lg={9} md={12} className="d-flex flex-wrap justify-content-lg-end justify-content-center gap-2">
            
            {/* DESTINATION Dropdown */}
            <DropdownButton
              title={`Destination: ${filters.destination}`}
              variant="primary" 
              className="fw-bold"
            >
              <Dropdown.Item onClick={() => handleFilterChange('destination', 'All Destinations')} active={filters.destination === 'All Destinations'}>All Destinations</Dropdown.Item>
              <Dropdown.Divider />
              {destinationList.map(destination => (
                <Dropdown.Item key={destination} onClick={() => handleFilterChange('destination', destination)} active={filters.destination === destination}>{destination}</Dropdown.Item>
              ))}
            </DropdownButton>
            
            {/* STARTING LOCATION Dropdown */}
            <DropdownButton
              title={`Location: ${filters.location}`}
              variant="outline-primary" 
              className="fw-bold"
            >
              <Dropdown.Item onClick={() => handleFilterChange('location', 'All Locations')} active={filters.location === 'All Locations'}>All Locations</Dropdown.Item>
              <Dropdown.Divider />
              {locationList.map(location => (
                <Dropdown.Item key={location} onClick={() => handleFilterChange('location', location)} active={filters.location === location}>{location}</Dropdown.Item>
              ))}
            </DropdownButton>

            {/* Age Dropdown */}
            <DropdownButton title={`Age: ${filters.age}`} variant="outline-primary">
              <Dropdown.Item onClick={() => handleFilterChange('age', 'All Ages')} active={filters.age === 'All Ages'}>All Ages</Dropdown.Item>
              <Dropdown.Divider />
              {ageRanges.map(range => (
                <Dropdown.Item key={range} onClick={() => handleFilterChange('age', range)} active={filters.age === range}>{range}</Dropdown.Item>
              ))}
            </DropdownButton>

            {/* Interests Dropdown */}
            <DropdownButton title={`Interests: ${filters.interest}`} variant="outline-primary">
              <Dropdown.Item onClick={() => handleFilterChange('interest', 'All Interests')} active={filters.interest === 'All Interests'}>All Interests</Dropdown.Item>
              <Dropdown.Divider />
              {interestsList.map(interest => (
                <Dropdown.Item key={interest} onClick={() => handleFilterChange('interest', interest)} active={filters.interest === interest}>{interest}</Dropdown.Item>
              ))}
            </DropdownButton>

            {/* Dates/Month Dropdown */}
            <DropdownButton title={`Available: ${filters.month}`} variant="outline-primary">
              <Dropdown.Item onClick={() => handleFilterChange('month', 'All Dates')} active={filters.month === 'All Dates'}>All Dates</Dropdown.Item>
              <Dropdown.Divider />
              {availableMonths.map(month => (
                <Dropdown.Item key={month} onClick={() => handleFilterChange('month', month)} active={filters.month === month}>{month}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </div>

      {/* Companion Cards Grid */}
      <Row xs={1} md={2} lg={4} className="g-4 mt-4">
        {filteredCompanions.length > 0 ? (
          filteredCompanions.map(companion => (
            <Col key={companion.id}>
              <CompanionCard companion={companion} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center p-5">
            <h4 className="text-muted">No travelers found for your current criteria. 😢</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CompanionFinder;