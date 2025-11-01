// src/pages/CompanionFinder.jsx

import React, { useState, useEffect, useCallback } from 'react'; 
import { Container, Row, Col, Dropdown, DropdownButton, Card, Form, InputGroup } from 'react-bootstrap';
import CompanionCard from '../components/CompanionCard';
import { getFilteredCompanions } from '../services/CompanionService'; // 🛑 NEW IMPORT
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
    const [filteredCompanions, setFilteredCompanions] = useState([]); 
    const [loading, setLoading] = useState(false); 

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };
    useEffect(() => {
        const fetchCompanions = async () => {
            setLoading(true);
            try {
                // Call the service function to get results from Firestore
                const results = await getFilteredCompanions(filters);
                setFilteredCompanions(results);
            } catch (error) {
                console.error("Failed to fetch companions:", error);
                setFilteredCompanions([]);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search input for better performance
        const delaySearch = setTimeout(fetchCompanions, 300); 

        return () => clearTimeout(delaySearch); // Cleanup debounce
    }, [filters]); // Rerun effect whenever filters change

    
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