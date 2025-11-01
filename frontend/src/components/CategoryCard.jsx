import React from 'react';
import '../styles/CategoryCard.css'; // Import the dedicated CSS

const CategoryCard = ({ title, description, imageUrl, info }) => {
    return (
        // The entire card component
        <div className="category-card"> 
            
            {/* 1. Image Container (Must come first) */}
            <div className="card-image-container">
                <img src={imageUrl} alt={title} className="card-image" />
            </div>

            {/* 2. Content Body (Comes second) */}
            <div className="card-body">
                
                {/* Title (e.g., "Historical Sites") */}
                <h3 className="card-title">{title}</h3> 
                
                {/* Description/Short Text */}
                <p className="card-description">{description}</p>
                
                {/* Important Info/Details */}
                <div className="card-info">
                    <p>
                        <strong>Important:</strong> {info}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;