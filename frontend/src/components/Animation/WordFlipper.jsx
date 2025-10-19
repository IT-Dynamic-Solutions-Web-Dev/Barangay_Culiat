import React from "react";

const DEFAULT_WORDS = [
  { text: "Barangay Culiat", color: "text-text-color-light" },
  { text: "#DangalNgLungsod", color: "text-secondary-text " },
  { text: "#KalidadsaSerbisyo", color: "text-accent " },
  { text: "#TatakBarangayCuliat", color: "text-primary-text " },
  { text: "#KalingaSaTao", color: "text-text-color-light " },
];

const WordFlipper = () => {
  return (
    <div className="pb-4 leading-18">
      <div className="overflow-hidden h-18 bg-transparent">
        <ul className="m-0 p-0 list-none animate-change">
          {DEFAULT_WORDS.map((word, index) => (
            <li key={index} className={`leading-24 ${word.color}`}>
              {word.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordFlipper;
