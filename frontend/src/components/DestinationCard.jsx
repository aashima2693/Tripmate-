import React from "react";

const DestinationCard = ({ name, image }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-50 h-56 object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />

      {/* Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Text overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-lg font-semibold drop-shadow-lg">
        {name}
      </div>
    </div>
  );
};

export default DestinationCard;
