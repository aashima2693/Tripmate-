// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import { FaRobot, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import DestinationCategoryCard from '../components/DestinationCard'; 
import '../styles/Home.css'; // <---- 🛑 CRITICAL: Make sure this CSS file is imported
import assets from '../assets/assets';
// MOCK DATA: Using placeholder images. Ensure these paths are CORRECT.
const destinationCategories = [
    { 
        id: 1, 
        title: "Historical Sites", 
        description: "Explore ancient wonders and world heritage sites.",
        imageUrl: "/assets/Historical_images.jpeg", // Make sure this image exists in your public/images folder
        info: "34,500 active trips." 
    },
    { 
        id: 2, 
        title: "Waterfalls", 
        description: "Chase majestic cascades and serene natural pools.",
        imageUrl: "/assets/waterfalls.jpeg", // Make sure this image exists in your public/images folder
        info: "15,200 travelers planned." 
    },
    { 
        id: 3, 
        title: "Mountains", 
        description: "Hike challenging peaks and enjoy alpine views.",
        imageUrl: "/assesta/mountains.jpeg", // Make sure this image exists in your public/images folder
        info: "Find a hiking buddy." 
    },
    { 
        id: 4, 
        title: "Beaches", 
        description: "Relax on sun-kissed sands and enjoy clear waters.",
        imageUrl: "/assests/beaches.jpeg", // Make sure this image exists in your public/images folder
        info: "Plan your summer escape." 
    },
];


const Home = () => {
  const navigate = useNavigate();

  const handlePlannerClick = () => navigate('/planner');
  const handleCompanionClick = () => navigate('/companions');
  const handleLoanClick = () => navigate('/loan');
  
  const handleCategoryClick = (categoryTitle) => {
    navigate(`/companions?category=${categoryTitle}`); 
  };

  return (
    <div className="landing-page-container">
      <header className="hero-gradient-bg">
        <div className="hero-content-wrapper">
          <h1>Welcome, Traveler!</h1>
          <p>Your next adventure awaits with TripMate 🚀</p>
        </div>
      </header>

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

      <section className="destinations-section" style={{ padding: '2rem 1.5rem', marginTop: '2rem' }}>
        <h2>Explore Popular Destinations</h2>
        
        {/* 🛑 CRITICAL: Ensure the class name here matches your CSS */}
        <div className="destination-category-grid">
            {destinationCategories.map(category => (
                <DestinationCategoryCard 
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    imageUrl={category.imageUrl}
                    info={category.info}
                    onClick={() => handleCategoryClick(category.title)}
                />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;