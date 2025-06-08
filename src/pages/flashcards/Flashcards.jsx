import NavigationBar from "../../components/NavigationBar";
import NavHeader from "../../components/NavHeader";
import CreateCard from "../../components/CreateCard";
import React from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Flashcards(props) {
  const [cardIds, setCardIds] = React.useState([]);
  const [deckName, setDeckName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  function AddCard() {
    console.log("card added");
    setCardIds((prevCardIds) => [...prevCardIds, prevCardIds.length]);
  }

  async function handleSave(e, redirectToLearn = false) {
    e.preventDefault();

    if (!props.currentUser) {
      alert("You are not logged in.");
      return;
    }

    try {
      const deckRef = await addDoc(collection(db, "decks"), {
        name: deckName,
        description,
        userId: props.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      const cardsPromises = cards.map((card) =>
        addDoc(collection(db, "decks", deckRef.id, "cards"), {
          question: card.question,
          answer: card.answer,
          createdAt: serverTimestamp(),
        })
      );
      await Promise.all(cardsPromises);

      alert("Deck saved successfully!");
      if (redirectToLearn) {
        // Redirect to learn page, e.g.:
        // navigate(`/learn/${deckRef.id}`);
      } else {
        navigate("/yourDecks");
      }
    } catch (error) {
      console.error("Error saving deck:", error, error.message, error.stack);
      alert("Failed to save deck: " + error.message);
    }
  }

  return (
    <>
      <NavHeader currentUser={props.currentUser} />
      <div className="flex min-h-screen bg-gray-50">
        <NavigationBar highlight="Flashcards" />
        <main className="flex-grow p-8 max-w-5xl mx-auto">
          <section className="bg-[#ebd2c7] rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-semibold mb-6 text-[#8d382b]">
              Create New Flashcard Deck
            </h1>
            <form onSubmit={(e) => handleSave(e, false)}>
              <div className="mb-4">
                <label
                  htmlFor="deckName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deck Name
                </label>
                <input
                  type="text"
                  id="deckName"
                  name="deckName"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  placeholder="Deck Name"
                  className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-[#5b9aa0] focus:border-[#5b9aa0]"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a Description"
                  rows={4}
                  className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-[#5b9aa0] focus:border-[#5b9aa0] resize-none"
                />
              </div>
              <div className="mb-6 space-y-4 max-h-96 overflow-y-auto">
                {cardIds.map((cardId) => (
                  <CreateCard
                    key={cardId}
                    cardId={cardId}
                    currentUser={props.currentUser}
                    setCurrentUser={props.setCurrentUser}
                    deleteCard={(id) => {
                      setCardIds((prevCardIds) =>
                        prevCardIds.filter((card) => card !== id)
                      );
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e, true)}
                  className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition"
                >
                  Save and Learn
                </button>
                <button
                  type="button"
                  onClick={AddCard}
                  className="ml-auto inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition"
                >
                  Add Card
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
