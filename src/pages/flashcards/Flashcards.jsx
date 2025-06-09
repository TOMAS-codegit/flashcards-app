import NavigationBar from "../../components/NavigationBar";
import NavHeader from "../../components/NavHeader";
import CreateCard from "../../components/CreateCard";
import React from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function Flashcards(props) {
  const { deckId } = useParams();
  const [cardIds, setCardIds] = React.useState([]);
  const [deckName, setDeckName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      try {
        const deckRef = doc(db, "decks", deckId);
        const deckSnap = await getDoc(deckRef);
        if (deckSnap.exists()) {
          const deckData = deckSnap.data();
          setDeckName(deckData.name || "");
          setDescription(deckData.description || "");
          // Fetch cards
          const cardsCol = collection(db, "decks", deckId, "cards");
          const cardsSnapshot = await getDocs(cardsCol);
          const fetchedCards = cardsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCards(fetchedCards);
          setCardIds(fetchedCards.map((_, index) => index));
        } else {
          setDeckName("");
          setDescription("");
          setCards([]);
          setCardIds([]);
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  }, [deckId]);

  function AddCard() {
    setCardIds((prevCardIds) => [...prevCardIds, prevCardIds.length]);
    setCards((prevCards) => [...prevCards, { question: "", answer: "" }]);
  }

  async function handleSave(e, redirectToLearn = false) {
    e.preventDefault();

    if (!props.currentUser) {
      alert("You are not logged in.");
      return;
    }

    try {
      if (deckId) {
        // Update existing deck
        const deckRef = doc(db, "decks", deckId);
        await updateDoc(deckRef, {
          name: deckName,
          description,
        });

        // Delete removed cards
        const existingCardIds = cards.map((card) => card.id).filter(Boolean);
        const cardsCol = collection(db, "decks", deckId, "cards");
        const cardsSnapshot = await getDocs(cardsCol);
        const cardsInDb = cardsSnapshot.docs.map((doc) => doc.id);
        const cardsToDelete = cardsInDb.filter(
          (id) => !existingCardIds.includes(id)
        );
        const deletePromises = cardsToDelete.map((id) =>
          deleteDoc(doc(db, "decks", deckId, "cards", id))
        );
        await Promise.all(deletePromises);

        // Update or add cards
        const updatePromises = cards.map((card) => {
          if (card.id) {
            // Update existing card
            const cardRef = doc(db, "decks", deckId, "cards", card.id);
            return updateDoc(cardRef, {
              question: card.question,
              answer: card.answer,
            });
          } else {
            // Add new card
            return addDoc(collection(db, "decks", deckId, "cards"), {
              question: card.question,
              answer: card.answer,
              createdAt: serverTimestamp(),
            });
          }
        });
        await Promise.all(updatePromises);

        alert("Deck updated successfully!");
        if (redirectToLearn) {
          navigate(`/yourDecks/learn/${deckId}`);
        } else {
          navigate("/yourDecks");
        }
      } else {
        // Create new deck
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
          navigate(`/yourDecks/learn/${deckRef.id}`);
        } else {
          navigate("/yourDecks");
        }
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
              {deckId ? "Edit Flashcard Deck" : "Create New Flashcard Deck"}
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
              {cardIds.map((cardId, index) => (
                <CreateCard
                  key={cardId}
                  cardId={cardId}
                  question={cards[index]?.question || ""}
                  answer={cards[index]?.answer || ""}
                  onChangeQuestion={(value) => {
                    setCards((prevCards) => {
                      const newCards = [...prevCards];
                      newCards[index] = { ...newCards[index], question: value };
                      return newCards;
                    });
                  }}
                  onChangeAnswer={(value) => {
                    setCards((prevCards) => {
                      const newCards = [...prevCards];
                      newCards[index] = { ...newCards[index], answer: value };
                      return newCards;
                    });
                  }}
                  currentUser={props.currentUser}
                  setCurrentUser={props.setCurrentUser}
                  deleteCard={(id) => {
                    setCardIds((prevCardIds) =>
                      prevCardIds.filter((card) => card !== id)
                    );
                    setCards((prevCards) =>
                      prevCards.filter((_, i) => i !== index)
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
