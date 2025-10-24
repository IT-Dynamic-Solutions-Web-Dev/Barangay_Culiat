import React from "react";
import AboutHero from "./AboutSections/AboutHero";
import MissionAndVision from "./AboutSections/MissionAndVision";
import Carousel from "./AboutSections/Carousel";
import MilesStones from "./AboutSections/MilesStones";
// import AboutIntro from "./AboutSections/AboutIntro";
// import AboutStats from "./AboutSections/AboutStats";
// import AboutGallery from "./AboutSections/AboutGallery";

const About = () => {
   return (
      <div className="min-h-screen">
         <AboutHero />
         <MissionAndVision />
         <Carousel />
         <MilesStones />
      </div>
   );
};

export default About;
