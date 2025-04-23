import React from "react";

import Header_1 from "../components/header/Header_1";
// import PlaceHolder from "../components/PlaceHolder";
import HeroSection from "../components/HeroSection";
import HowItsWork from "../components/HowItsWork";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";

const LandingPage = () => {
  return (
    <div className="landingPage-container">
      <Header_1 />
      <HeroSection />
      <HowItsWork />
      <CategorySection />
      <Feature />
    </div>
  );
};

export default LandingPage;
