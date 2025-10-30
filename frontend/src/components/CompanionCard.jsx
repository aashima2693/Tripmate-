// src/components/CompanionCard.jsx
import React from "react";
import "../styles/Companion.css";

const CompanionCard = ({ companion, onClick }) => {
  return (
    <div className="companion-card" onClick={onClick}>
      <img className="avatar" src={companion.avatar} alt={companion.name} />
      <div className="card-body">
        <div className="card-top">
          <div>
            <div className="name-row">
              <strong>{companion.name}</strong>
              {companion.verified && <span className="verified-small">KYC Verified</span>}
            </div>
            <div className="muted">{companion.age} • {companion.title}</div>
          </div>

          <div className="calendar-icon">📅</div>
        </div>
      </div>
    </div>
  );
};

export default CompanionCard;
