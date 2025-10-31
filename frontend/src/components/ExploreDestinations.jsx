import React from "react";
import Slider from "react-slick";
import DestinationCard from "./DestinationCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
  { name: "Mountains", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { name: "Beaches", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Cities", image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e" },
  { name: "Deserts", image: "https://images.unsplash.com/photo-1606813909354-4288b1b94e87" },
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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="mt-12 px-6 pb-10 bg-gray-50">
      <Slider {...settings}>
        {destinations.map((d, idx) => (
          <DestinationCard key={idx} name={d.name} image={d.image} />
        ))}
      </Slider>
    </section>
  );
};

export default ExploreDestinations;
