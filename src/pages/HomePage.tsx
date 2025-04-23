import Header_1 from "../components/header/Header_1";
import HeroSection from "../components/HeroSection";
import HowItsWork from "../components/HowItsWork";
import CategorySection from "../components/CategorySection";
import Feature from "../components/Feature";
import RecentJobsSection from "../components/RecentJobsSection";
import ReviewsSection from "../components/ReviewsSection";
import PricingSection from "../components/PricingSection";
import FooterSection_1 from "../components/footer/FooterSection_1";

const LandingPage = () => {
  return (
    <div className="landingPage-container">
      <Header_1 />
      <HeroSection />
      <HowItsWork />
      <CategorySection />
      <Feature />
      <RecentJobsSection />
      <ReviewsSection />
      <PricingSection />
      <FooterSection_1 />
    </div>
  );
};

export default LandingPage;
