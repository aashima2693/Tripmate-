// src/pages/CompanionFinder.jsx

import React, { useState, useEffect, useCallback } from 'react'; // 🛑 Changed useMemo to useEffect/useState
import { Container, Row, Col, Dropdown, DropdownButton, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import CompanionCard from '../components/CompanionCard';
import { fetchCompanions } from '../services/api/companionApi';
import { 
    // ... all data imports 
    getAgeRange, 
    interestsList, 
    ageRanges, 
    availableMonths,
    destinationList,
    locationList
} from '../data/Companions';

const CompanionFinder = () => {
    const [filters, setFilters] = useState({ /* ... your filter state ... */ });
    const [filteredCompanions, setFilteredCompanions] = useState([]); // 🛑 State for results
    const [loading, setLoading] = useState(false); // 🛑 Loading state

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
            {/* ... Header and Filter Bar ... */}
            
            {/* Companion Cards Grid */}
            <Row xs={1} md={2} lg={4} className="g-4 mt-4">
                {loading ? (
                    <Col xs={12} className="text-center p-5">
                        <Spinner animation="border" variant="primary" className="me-2" />
                        <h4 className="text-muted mt-3">Finding potential trip mates...</h4>
                    </Col>
                ) : filteredCompanions.length > 0 ? (
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