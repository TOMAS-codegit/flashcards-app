import { House } from 'lucide-react';
import { FolderOpen } from 'lucide-react';
import { WalletCards } from 'lucide-react';
import NavComponents from './NavComponents';
import { useNavigate } from 'react-router-dom'

export default function NavigationBar(props) {

    const highlight = props.highlight 
    const navigate = useNavigate(); 
    

    return (
        <>
            <nav className="bg-[#8d382b] shadow-sm w-[300px] h-screen py-2 flex text-center flex-shrink-0 md:block">
                <ul className="flex flex-col gap-3 text-center w-full h-full">
                    <li><NavComponents 
                        onClick={() => navigate("/latest")}
                        icon = {<House />}
                        text = "Home"
                        highlight = {highlight === "Home"}git 
                    /></li>
                    <li><NavComponents 
                        onClick={() =>navigate('/yourDecks')}
                        icon = {<FolderOpen />}
                        text = "Your Decks"
                        highlight = {highlight === "YourDecks"}
                    /></li>
                    <li><NavComponents 
                        onClick={() =>navigate('/flashcards')}
                        icon = {<WalletCards />}
                        text = "Flashcards"
                        highlight = {highlight === "Flashcards"}
                    /></li>
                </ul>
            </nav>
        </>
    );
}
