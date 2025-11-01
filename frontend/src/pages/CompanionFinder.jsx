// src/pages/CompanionFinder.jsx

import React, { useState, useEffect, useCallback } from 'react'; // 🛑 Changed useMemo to useEffect/useState
import { Container, Row, Col, Dropdown, DropdownButton, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import CompanionCard from '../components/CompanionCard';
import { 
    companionData, // 🛑 Local mock data
    getAgeRange, 
    interestsList, 
    ageRanges, 
    availableMonths,
    destinationList,
    locationList
} from '../data/Companions'; // 🛑 Source of truth is now local data

const CompanionFinder = () => {
    const [filters, setFilters] = useState({ /* ... your filter state ... */ });
    const [filteredCompanions, setFilteredCompanions] = useState([]); 
    const [loading, setLoading] = useState(false); 

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    // 🛑 Replaced useMemo with a data fetching effect
    useEffect(() => {
        const fetchCompanionsData = async () => {
            setLoading(true);
            try {
                // 🛑 CRITICAL: Call the new function name
                const results = await fetchCompanions(filters); 
                setFilteredCompanions(results);
            } catch (error) {
                // ...
            } finally {
                setLoading(false);
            }
        };

        // Debounce search input for better performance
        const delaySearch = setTimeout(fetchCompanions, 300); 

        return () => clearTimeout(delaySearch); // Cleanup debounce
    }, [filters]); // Rerun effect whenever filters change

    // ... (rest of the component JSX, UNCHANGED) ...

    return (
        <Container className="my-5">
            
            {/* Modern Gradient Header Banner */}
            <Card className="mb-5 shadow-lg border-0 hero-gradient-bg">
                <Card.Body className="text-center py-4">
                    <h1 className="fw-bolder m-0 text-white">🌍 Find Your TripMate</h1>
                    <p className="m-0 fs-5 text-white opacity-75">Connect with travelers heading to the **same destination** and starting near you.</p>
                </Card.Body>
            </Card>

            {/* 🛑 FILTER AND SEARCH BAR (RESTORED) */}
            <div className="p-3 mb-4 rounded-4 shadow-sm bg-white">
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

                    {/* Filter Dropdowns */}
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

                        {/* Sorting Dropdown */}
                        <DropdownButton title={`Sort: ${sortBy}`} variant="success">
                            <Dropdown.Item onClick={() => setSortBy('Default')} active={sortBy === 'Default'}>Default</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setSortBy('AgeAsc')} active={sortBy === 'AgeAsc'}>Age (Low to High)</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortBy('AgeDesc')} active={sortBy === 'AgeDesc'}>Age (High to Low)</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortBy('NameAsc')} active={sortBy === 'NameAsc'}>Name (A-Z)</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </div>


            {/* Companion Cards Grid */}
            <Row xs={1} md={2} lg={4} className="g-4 mt-4">
                {/* 🛑 Ensure key is cast to string for safety, as the component expects it */}
                {filteredAndSortedCompanions.length > 0 ? (
                    filteredAndSortedCompanions.map(companion => (
                        <Col key={String(companion.id)}>
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