import React from "react";
import Council from "./HomeSections/Council";
import Hero from "./HomeSections/Hero";
import Stat from "./HomeSections/Stat";
import News from "./HomeSections/News";
import Explore from "./HomeSections/Explore";
import Services from "./HomeSections/Services";
import GetInTouch from "./HomeSections/GetInTouch";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stat />
      <Services />
      <News />
      <Explore />
      <Council />
      <GetInTouch />
    </div>
  );
};

export default Home;
