// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { FaRobot, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import DestinationCard from '../components/DestinationCard';
import ExploreDestinations from '../components/ExploreDestinations';

const Home = () => {
  const navigate = useNavigate();

  // Navigation Handlers
  const handlePlannerClick = () => navigate('/planner');
  const handleCompanionClick = () => navigate('/companions');
  const handleLoanClick = () => navigate('/loan');

  return (
    <div className="landing-page-container">
      <Navbar />

      {/* 🌄 Hero Section */}
      <header className="hero-gradient-bg">
        <div className="hero-content-wrapper">
          <h1>Welcome, Anjali!</h1>
          <p>Your next adventure awaits with TripMate 🚀</p>
        </div>
      </header>

      {/* 🌟 Feature Cards Section */}
      <section className="feature-cards-grid">
        <FeatureCard
          Icon={FaRobot}
          title="AI Trip Planner"
          subtitle="Craft a personalized day-by-day itinerary"
          colorClass="card-gradient-blue-green"
          onClick={handlePlannerClick}
        />

        <FeatureCard
          Icon={FaUsers}
          title="Find Companion"
          subtitle="Connect with verified travelers & local guides"
          colorClass="card-solid-blue"
          onClick={handleCompanionClick}
        />

        <FeatureCard
          Icon={FaMoneyBillWave}
          title="Instant Travel Loan"
          subtitle="Quick approval for your next journey"
          colorClass="card-solid-green"
          onClick={handleLoanClick}
        />
      </section>

      {/* 🏝️ Destination Section Placeholder */}
      <section className="destinations-section" style={{ padding: '2rem 1.5rem', marginTop: '2rem' }}>
        <h2>Explore Popular Destinations</h2>
        <p style={{ color: 'var(--color-text-subtle)' }}>
          <ExploreDestinations/>
        </p>
      </section>
    </div>
  );
};

export default Home;
