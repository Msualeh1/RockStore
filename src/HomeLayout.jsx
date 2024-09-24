import React from 'react';
import HeroSection from './Hero';
import CardsTab from './CardsTab';


// This layout component is only for the homepage
const HomeLayout = () => {
  return (
    <>
      <HeroSection />
      <CardsTab />
    </>
  );
};

export default HomeLayout;
