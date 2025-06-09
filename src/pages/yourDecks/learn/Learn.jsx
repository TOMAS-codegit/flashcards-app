import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get deckId from URL
import { db } from "../../../firebase";
import NavHeader from "../../../components/NavHeader";
import NavigationBar from "../../../components/NavigationBar";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Learn(props) {
  const { deckId } = useParams(); // Make sure your route is /yourDecks/learn/:deckId
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  async function fetchDeckInfo() {
    if (!deckId) return;
    try {
      const deckRef = doc(db, "decks", deckId);
      const deckSnap = await getDoc(deckRef);
      if (deckSnap.exists()) {
        setDeck({ id: deckSnap.id, ...deckSnap.data() });
      } else {
        setDeck(null);
      }
    } catch (error) {
      console.error("Error fetching deck info:", error);
      setDeck(null);
    }
  }
  fetchDeckInfo();
}, [deckId]);

  useEffect(() => {
    async function fetchCards() {
      if (!deckId) return;
      setLoading(true);
      try {
        const cardsCol = collection(db, "decks", deckId, "cards");
        const snapshot = await getDocs(cardsCol);
        const fetchedCards = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, [deckId]);

  async function deleteDeck() {
    if (!deckId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this deck? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      // Delete all cards in the deck
      const cardsCol = collection(db, "decks", deckId, "cards");
      const snapshot = await getDocs(cardsCol);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Delete the deck document
      const deckRef = doc(db, "decks", deckId);
      await deleteDoc(deckRef);

      // Navigate back to yourDecks page
      navigate("/yourDecks");
    } catch (error) {
      console.error("Error deleting deck:", error);
      alert("Failed to delete the deck. Please try again.");
    }
  }

  function prevCard() {
    setFlipped(false);
    setCurrent((prev) => Math.max(0, prev - 1));
  }

  function nextCard() {
    setFlipped(false);
    setCurrent((prev) => Math.min(cards.length - 1, prev + 1)); 
  }

  if (loading) return <div>Loading cards...</div>;
  if (!cards.length) return <div>No cards in this deck.</div>;
  return (
    <>
      <NavHeader currentUser={props.currentUser} />
      <div className="flex min-h-screen bg-gray-50">
      <NavigationBar highlight="YourDecks" />
      <main className="flex-grow p-8 flex flex-col items-center min-h-screen bg-[#f9f7f6]">
        <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold mb-8 text-[#8d382b]">Learn: {deck ? deck.name : "Loading..."}</h1>
        <div className="flex gap-4">
        <button onClick={() => navigate(`/flashcards/${deckId}`)}>EDIT</button>
        <button onClick={deleteDeck}><Trash2 /></button>
        </div>
        </div>

        {deck && <p className="mb-4 text-gray-600">{deck.description}</p>}
        <div className="flex items-center gap-8">
          <button
            onClick={prevCard}
            className="text-4xl px-5 py-3 rounded-lg bg-[#8d382b] text-white hover:bg-[#a14a3a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="previous Card"
            disabled={current === 0}
          >
            &#8592;
          </button>
          <div
            className="w-300 h-150 perspective cursor-pointer"
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 ${
                flipped ? "rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute w-full h-full bg-[#ebd2c7] rounded-lg shadow-lg flex items-center justify-center text-3xl font-semibold text-[#8d382b] backface-hidden p-6">
                {cards[current].question}
              </div>
              <div className="absolute w-full h-full bg-[#ebd2c7] rounded-lg shadow-lg flex items-center justify-center text-3xl font-semibold text-[#8d382b] rotate-y-180 backface-hidden p-6">
                {cards[current].answer}
              </div>
            </div>
          </div>
          <button
            onClick={nextCard}
            className="text-4xl px-5 py-3 rounded-lg bg-[#8d382b] text-white hover:bg-[#a14a3a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="next Card"
            disabled={current === cards.length - 1}
          >
            &#8594;
          </button>
        </div>
        <div className="mt-6 text-gray-600 text-lg">
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
