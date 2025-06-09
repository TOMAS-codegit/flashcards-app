import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import NavHeader from "../../components/NavHeader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import DeckFolder from "../../components/DeckFolder";

export default function YourDecks(props) {
  const [decks, setDecks] = useState([]);
  const currentUser = props.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    async function fetchDecks() {
      try {
        const q = query(
          collection(db, "decks"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const userDecks = [];
        querySnapshot.forEach((doc) => {
          userDecks.push({ id: doc.id, ...doc.data() });
        });
        setDecks(userDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    }

    fetchDecks();
  }, [currentUser]);

  return (
    <>
      <NavHeader currentUser={currentUser} />
      <div className="flex">
        <NavigationBar highlight="YourDecks" />
        <div className="flex-grow p-8">
          <h2 className="text-2xl font-bold mb-4">Your Decks</h2>
          {currentUser ? (
            decks.length === 0 ? (
              <p>No decks found. Create one!</p>
            ) : (
              <div className="max-h-180 overflow-y-auto">
                <ul className="space-y-4">
                  {decks.map((deck) => (

                    <DeckFolder 
                      id = {deck.id}
                      key = {deck.id}
                      name = {deck.name}
                      description = {deck.description}
                      createdAt = {deck.createdAt?.toDate?.().toLocaleString?.() || "Unknown"}
                    />


                  ))}
                </ul>
              </div>
            )
          ) : (
            <p>Please log in to see your decks.</p>
          )}
        </div>
      </div>
    </>
  );
}
