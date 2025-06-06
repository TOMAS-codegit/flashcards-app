import NavigationBar from '../../components/NavigationBar';
import NavHeader from '../../components/NavHeader';

export default function YourDecks() {
    return (
        <>
            <NavHeader />
            <div className="flex">
                <NavigationBar 
                    highlight="YourDecks"
                />
                <div className="flex-grow">
                    {/* YourDecks page content can go here */}
                </div>
            </div>
        </>
    )
}
