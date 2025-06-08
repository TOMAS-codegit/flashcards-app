import React, { useState } from "react";
import NavHeader from "../../../components/NavHeader";
import NavigationBar from "../../../components/NavigationBar";

// Replace with Firestore fetch later
const sampleCards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "E = mc² is an equation by which scientist?", answer: "Albert Einstein" },
  { question: "What is the largest planet?", answer: "Jupiter" },
];

export default function Learn(props) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = sampleCards; // Replace with props.cards or fetched data

  function prevCard() {
    setFlipped(false);
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  }

  function nextCard() {
    setFlipped(false);
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  }

  if (!cards.length) {
    return <div>No cards in this deck.</div>;
  }

  return (
    <>
      <NavHeader currentUser={props.currentUser} />
      <div className="flex">
        <NavigationBar highlight="YourDecks" />
        <main className="flex-grow p-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6">Learn: Deck Name</h1>
          <div className="flex items-center gap-8">
            
            <button
              onClick={prevCard}
              className="text-3xl px-4 py-2 rounded hover:bg-[#ebd2c7] transition"
              aria-label="Previous Card"
            >
              &#8592;
            </button>

            <div
              className={`w-200 h-150 perspective cursor-pointer`}
              onClick={() => setFlipped((f) => !f)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 ${
                  flipped ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#ebd2c7] rounded-lg shadow-lg flex items-center justify-center text-2xl font-semibold text-[#8d382b] backface-hidden">
                  {cards[current].question}
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-[#ebd2c7] rounded-lg shadow-lg flex items-center justify-center text-2xl font-semibold text-[#5b9aa0] rotate-y-180 backface-hidden">
                  {cards[current].answer}
                </div>
              </div>
            </div>

            <button
              onClick={nextCard}
              className="text-3xl px-4 py-2 rounded hover:bg-[#ebd2c7] transition"
              aria-label="Next Card"
            >
              &#8594;
            </button>
          </div>
          <div className="mt-4 text-gray-500">
            Card {current + 1} of {cards.length}
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Click card to flip
          </div>
        </main>
      </div>
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}
      </style>
    </>
  );
}
