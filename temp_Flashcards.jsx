import NavigationBar from '../../components/NavigationBar';
import NavHeader from '../../components/NavHeader';
import CreateCard from '../../components/CreateCard';
import React from 'react';

export default function Flashcards(props) {

    const [cardIds, setCardIds] = React.useState([]);

    function AddCard() {
        console.log("card added");
        setCardIds(prevCardIds => [...prevCardIds, prevCardIds.length]);
    }

    return (
        <>
            <NavHeader currentUser={props.currentUser} />
            <div className="flex">
                <NavigationBar 
                    highlight="Flashcards"
                />
                <div className="flex-grow">
                    <div className="bg-[#8d382b]">
            <form>
    <div>
        <h1>Create New Flashcard Deck</h1>

        <button type="submit" className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition">Save</button>
        <button type="submit" className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition">Save and Learn</button>
        
        <input type="text" name="deckName" placeholder='Deck Name' className="mt-4 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5b9aa0] focus:border-[#5b9aa0]" />

        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" placeholder='Add a Description'></textarea>

        
        {cardIds.map(cardId => (
            <CreateCard 
                key={cardId} 
                cardId={cardId} 
                currentUser={props.currentUser} 
                setCurrentUser={props.setCurrentUser}
            />
        ))}

        <button type="button" onClick={AddCard} className="mt-4 inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition">Add Card</button>

    </div>
</form>
</div>
                </div>

            </div>
        </>
    )
}
