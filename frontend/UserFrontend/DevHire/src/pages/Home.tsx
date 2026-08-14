import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import HotJobs from '../components/home/HotJobs';
import FeaturedCompanies from '../components/home/FeaturedCompanies';
import TechStack from '../components/home/TechStack';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <Stats />
      <HotJobs />
      <FeaturedCompanies />
      <TechStack />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;