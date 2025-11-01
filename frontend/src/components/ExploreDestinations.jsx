// src/pages/ExploreDestinations.jsx

import React from "react";
import { Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import DestinationCard from "./DestinationCard";
import assets from "../assets/assets"; // Imports the image object
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExploreDestinations = () => {
    
    // 🛑 CRITICAL FIX: Ensure property casing exactly matches the exported keys in assets.jsx
    const destinations = [
        // BEFORE: assets.mountains (lowercase m) 
        // 🛑 FIX: Must match the key name exported from assets.jsx (Capital M for Mountains.jpeg)
        { name: "Mountains", image: assets.mountains }, 
        
        // BEFORE: assets.beaches (correct if file is lowercase)
        { name: "Beaches", image: assets.beaches }, 
        
        // BEFORE: assets.historical_images (correct if file is PascalCase)
        { name: "Historical Sites", image: assets.historical_images }, 
        
        // BEFORE: assets.Waterfall (correct)
        { name: "Waterfall", image: assets.Waterfall }, 
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4, 
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Container fluid className="px-0 py-4">
            <Row>
                <Slider {...settings}>
                    {destinations.map((d, idx) => (
                        <DestinationCard key={idx} name={d.name} image={d.image} />
                    ))}
                </Slider>
            </Row>
        </Container>
    );
};

export default ExploreDestinations;