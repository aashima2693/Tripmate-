// src/pages/CompanionProfile.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Companion.css";

/* NOTE: In a real app you'd fetch the profile by id.
   For demo we use the same sample set so this page works offline.
*/
const sampleCompanions = [
  {
    id: "1",
    name: "Rohan S.",
    age: 29,
    title: "Solo Traveler, Photographer",
    avatar: "https://i.pravatar.cc/150?img=32",
    verified: true,
    about: ["Adventure", "Privateventure", "Photography", "Culture"],
    travelStyle: ["Mountains & Trekking", "Wildlife Safaris"],
    upcoming: "5 Days us in Himalayas - Oct",
  },
  {
    id: "2",
    name: "Priya K.",
    age: 27,
    title: "Culture & Food Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=47",
    verified: true,
    about: ["Food", "Culture", "Local Experiences"],
    travelStyle: ["City Walks", "Food Tours"],
    upcoming: "3 Days Goa Beach Trip - Nov",
  },
  {
    id: "3",
    name: "Amit M.",
    age: 31,
    title: "Backpacker, Remote Worker",
    avatar: "https://i.pravatar.cc/150?img=12",
    verified: false,
    about: ["Trekking", "Camping"],
    travelStyle: ["Budget Backpacking"],
    upcoming: "",
  },
];

const CompanionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = sampleCompanions.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="companion-profile-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <p style={{ padding: 40 }}>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="companion-profile-page">
      <div className="profile-top">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>TripMate</h2>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          <div className="profile-meta">
            <div className="profile-name">
              <h3>{profile.name}</h3>
              {profile.verified && <span className="verified-pill">KYC Verified</span>}
            </div>
            <p className="muted">{profile.age} • {profile.title}</p>
          </div>
        </div>

        <div className="profile-section">
          <h4>About Me</h4>
          <ul className="profile-list">
            {profile.about.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>

        <div className="profile-section">
          <h4>Travel Style</h4>
          <ul className="profile-list">
            {profile.travelStyle.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        <div className="profile-section">
          <h4>Interests / Upcoming Trip</h4>
          <p className="muted">{profile.upcoming || "No upcoming trips listed"}</p>
        </div>

        <div className="profile-actions">
          <button className="primary-cta">Send Connection Request</button>
          <button className="secondary-cta">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default CompanionProfile;
