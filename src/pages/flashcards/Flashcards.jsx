import NavigationBar from '../../components/NavigationBar';
import NavHeader from '../../components/NavHeader';

export default function Flashcards() {
    return (
        <>
            <NavHeader />
            <div className="flex">
                <NavigationBar 
                    highlight="Flashcards"
                />
                <div className="flex-grow">
                    {/* Flashcards page content can go here */}
                </div>
            </div>
        </>
    )
}
