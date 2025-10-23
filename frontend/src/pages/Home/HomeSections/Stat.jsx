import React from "react";
import { CountingNumber } from "../../../components/ui/shadcn-io/counting-number/index";

const stats = [
  { number: 45892, label: "Total Population" },
  { number: 25892, label: "Registered Voters" },
  { number: 48932, label: "Total Residents" },
  { number: 37, label: "Square Kilometer Area" },
];

const Stat = () => {
  return (
    <section
      className="lg:absolute lg:-bottom-[3%] lg:left-1/2 lg:-translate-x-1/2 lg:py-0 py-6 w-full px-4"
      id="home-stat"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>

              <CountingNumber
                number={stat.number}
                inView={true}
                className="text-2xl font-bold text-[#262626] mb-1"
              ></CountingNumber>

              <p className="text-sm text-[#6c6c6c]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stat;
