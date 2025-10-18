import React from "react";

const stats = [
  { number: "45,892", label: "Total Population" },
  { number: "25,892", label: "Registered Voters" },
  { number: "48,932", label: "Total Residents" },
  { number: "45,893", label: "Active Documents" },
];

const Stat = () => {
  return (
    <section className="py-12 px-4" id="home-stat">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#b30000] rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#262626] mb-1">
                {stat.number}
              </h3>
              <p className="text-sm text-[#6c6c6c]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stat;
