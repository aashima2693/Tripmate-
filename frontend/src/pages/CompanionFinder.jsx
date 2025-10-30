// src/pages/CompanionFinder.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanionCard from "../components/CompanionCard";
import FilterTabs from "../components/FilterTabs";
import "../styles/Companion.css";

const sampleCompanions = [
  {
    id: "1",
    name: "Rohan S.",
    age: 29,
    title: "Solo Traveler, Photographer",
    avatar: "https://i.pravatar.cc/100?img=32",
    verified: true,
    tags: ["Adventure", "Photography", "Culture"],
    upcoming: "5 Days us in Himalayas - Oct",
  },
  {
    id: "2",
    name: "Priya K.",
    age: 27,
    title: "Culture & Food Enthusiast",
    avatar: "https://i.pravatar.cc/100?img=47",
    verified: true,
    tags: ["Food", "Culture"],
    upcoming: "3 Days Goa Beach Trip - Nov",
  },
  {
    id: "3",
    name: "Amit M.",
    age: 31,
    title: "Backpacker, Remote Worker",
    avatar: "https://i.pravatar.cc/100?img=12",
    verified: false,
    tags: ["Mountains", "Trekking"],
    upcoming: "",
  },
];

const CompanionFinder = () => {
  const [companions] = useState(sampleCompanions);
  const navigate = useNavigate();

  const openProfile = (id) => {
    navigate(`/companions/${id}`);
  };

  return (
    <div className="companion-page">
      <div className="companion-header">
        <div className="top-icons">
          <span className="icon">✈️</span>
          <span className="logo">TripMate</span>
          <span className="icon circle">◯</span>
        </div>

        <h1 className="companion-title">Find Your Travel Companion</h1>
        <FilterTabs />
      </div>

      <div className="companion-list-container">
        <div className="cards-column">
          {companions.map((c) => (
            <CompanionCard key={c.id} companion={c} onClick={() => openProfile(c.id)} />
          ))}
        </div>

        {/* On wide screens you can show profile side-by-side.
            For this minimal implementation the profile is a separate route. */}
      </div>
    </div>
  );
};

export default CompanionFinder;
