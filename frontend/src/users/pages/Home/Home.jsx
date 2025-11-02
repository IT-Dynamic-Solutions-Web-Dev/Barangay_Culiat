import React from "react";
import Council from "./HomeSections/Council";
import Hero from "./HomeSections/Hero";
import Announcements from "./HomeSections/Announcements";
import Explore from "./HomeSections/Explore";
import Services from "./HomeSections/Services";
import GetInTouch from "./HomeSections/GetInTouch";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Announcements />
      <Explore />
      <Council />
      <GetInTouch />
    </div>
  );
};

export default Home;
