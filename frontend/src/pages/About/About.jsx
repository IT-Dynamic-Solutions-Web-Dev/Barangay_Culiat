import React from "react";
import AboutHero from "./AboutSections/AboutHero";
import MissionAndVision from "./AboutSections/MissionAndVision";
import Mission from "./AboutSections/Mission";
import Vision from "./AboutSections/Vision";
import Goals from "./AboutSections/Goals";
import Carousel from "./AboutSections/Carousel";
import CouncilMembers from "./AboutSections/CouncilMembers";
import MilesStones from "./AboutSections/MilesStones";
// import AboutIntro from "./AboutSections/AboutIntro";
// import AboutStats from "./AboutSections/AboutStats";
// import AboutGallery from "./AboutSections/AboutGallery";

const About = () => {
   return (
      <div className="min-h-screen">
         <AboutHero />
         <Mission />
         <Vision />

         <CouncilMembers />
         <Goals />
         <Carousel />
         {/* <MilesStones /> */}
      </div>
   );
};

export default About;
