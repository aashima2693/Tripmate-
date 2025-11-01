// src/components/DestinationCard.jsx (Assuming this is the file used in the slider)

import React from 'react';
// Assuming your styling for the image overlay is here:
// import '../styles/CategoryCard.css'; 

// Renaming props to match usage in ExploreDestinations: name, image
const DestinationCard = ({ name, image }) => { 
    
    // Using a common Bootstrap Card structure (or simple div structure)
    return (
        // Wrapper div is necessary for react-slick slide sizing
        <div className="p-2"> 
            <div className="category-card-wrapper"> 
                
                {/* Image Container */}
                <div className="card-image-container">
                    <img 
                        src={image} // 🛑 Uses the image path passed from ExploreDestinations
                        alt={name} 
                        className="card-image object-cover w-100 h-100" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            // If image fails, show a placeholder URL (or a local placeholder image path)
                            e.target.src="https://via.placeholder.com/400x300?text=No+Image"; 
                        }}
                    />
                    {/* Text Overlay */}
                    <div className="card-text-overlay">
                        <h3 className="card-title text-white">{name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;