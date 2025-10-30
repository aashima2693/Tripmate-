import React, { useState } from "react";
import "../styles/Companion.css";

const FilterTabs = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    gender: "",
    age: "",
    interests: "",
    dates: "",
  });

  const handleSelect = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-heading">Find Your Travel Companion</h2>
      <div className="filter-buttons">
        <select
          className="filter-btn"
          value={filters.gender}
          onChange={(e) => handleSelect("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className="filter-btn"
          value={filters.age}
          onChange={(e) => handleSelect("age", e.target.value)}
        >
          <option value="">Age</option>
          <option value="18-25">18–25</option>
          <option value="26-35">26–35</option>
          <option value="36-50">36–50</option>
          <option value="50+">50+</option>
        </select>

        <select
          className="filter-btn"
          value={filters.interests}
          onChange={(e) => handleSelect("interests", e.target.value)}
        >
          <option value="">Interests</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="photography">Photography</option>
          <option value="culture">Culture</option>
        </select>

        <input
          type="date"
          className="filter-btn date-input"
          value={filters.dates}
          onChange={(e) => handleSelect("dates", e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterTabs;
