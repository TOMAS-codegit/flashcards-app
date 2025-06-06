import { Menu } from 'lucide-react';
import { Notebook } from 'lucide-react';
import { House } from 'lucide-react';
import { FolderOpen } from 'lucide-react';
import { WalletCards } from 'lucide-react';
import NavComponents from './NavComponents';

export default function NavigationBar(props) {

    const highlight = props.highlight 

    return (
        <>
            <header className="bg-[#8d382b] shadow-sm">
                <div className="max-w-8xl mx-auto pl-5 pr-10 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <Menu className="w-6 h-6 text-[#ebd2c7] hover:text-[#686ba1]" />
                        <div className="flex items-center gap-1">
                            <Notebook className="w-6 h-6 text-[#ebd2c7]" />
                            <h1 className="text-2xl font-bold text-[#ebd2c7]">Revu</h1>
                        </div>
                    </div>

                    {/* maybe add search bar if may time pa */}

                    <div className="space-x-6">
                        <button className="text-[#ebd2c7] hover:text-[#686ba1]">Profile</button>
                    </div>
                </div>
            </header>

            <nav className="bg-[#8d382b] shadow-sm max-w-3xs h-screen py-2 flex text-center">
                <ul className="flex flex-col text-center w-full h-full">
                    <li><NavComponents 
                        icon = {<House />}
                        text = "Home"
                        highlight = {highlight === "Home"}
                    /></li>
                    <li><NavComponents 
                        icon = {<FolderOpen />}
                        text = "Your Decks"
                        highlight = {highlight === "Decks"}
                    /></li>
                    <li><NavComponents 
                        icon = {<WalletCards />}
                        text = "Flashcards"
                        highlight = {highlight === "lashcards"}
                    /></li>
                </ul>
            </nav>
        </>
    );
}