// src/components/FeatureCard.jsx (Ensure this component is updated)

import React from 'react';
import '../styles/FeatureCard.css'; 

// 🛑 MODIFICATION: Accept and destructure the onClick prop
const FeatureCard = ({ Icon, title, subtitle, colorClass, onClick }) => { 
  return (
    // 🛑 MODIFICATION: Apply the onClick handler to the main div/button
    <div className={`feature-card ${colorClass}`} onClick={onClick}> 
      <div className="icon-wrapper">
        <Icon size={30} color="#FFFFFF" />
      </div>
      <div className="text-content">
        <h3 className="title">{title}</h3>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;