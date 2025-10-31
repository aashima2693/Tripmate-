import React from "react";
import { Container, Row } from 'react-bootstrap'; // Added Container and Row
import Slider from "react-slick";
import DestinationCard from "./DestinationCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Your data array (unchanged)
const destinations = [
    { name: "Mountains", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Beaches", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { name: "Cities", image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e" },
    { name: "Deserts", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { name: "Islands", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { name: "Forests", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Historical Sites", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe" },
    { name: "Waterfalls", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
];

const ExploreDestinations = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        // **Crucial for showing 4 cards:**
        slidesToShow: 4, 
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } }, // Added 4 for large screens
            { breakpoint: 992, settings: { slidesToShow: 3 } },  // Bootstrap 'lg'
            { breakpoint: 768, settings: { slidesToShow: 2 } },  // Bootstrap 'md'
            { breakpoint: 576, settings: { slidesToShow: 1 } },  // Bootstrap 'sm'
        ],
    };

    return (
        <Container fluid className="px-0 py-4">
          <Row>
            <Slider {...settings}>
              {destinations.map((d, idx) => (
                // Use d.name as key if unique, otherwise idx is acceptable
                <DestinationCard key={idx} name={d.name} image={d.image} />
              ))}
            </Slider>
          </Row>
        </Container>
    );
};

export default ExploreDestinations;