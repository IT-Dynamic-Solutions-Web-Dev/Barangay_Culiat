import React from "react";
import AboutHero from "./AboutSections/AboutHero";

import Carousel from "./AboutSections/Carousel";
import History from "./AboutSections/History";
import Goals from "./AboutSections/Goals";
import OrganizationMembers from "./AboutSections/OrganizationMembers";
import MissionAndVision2 from "./AboutSections/MissionAndVision2";
// import AboutIntro from "./AboutSections/AboutIntro";
// import AboutStats from "./AboutSections/AboutStats";
// import AboutGallery from "./AboutSections/AboutGallery";

const About = () => {
   return (
      <div className="min-h-screen">
         <AboutHero />
         <Goals />
         <MissionAndVision2 />
         <Carousel />
         <History />
         <OrganizationMembers />
      </div>
   );
};

export default About;
