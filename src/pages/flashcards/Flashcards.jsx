import NavigationBar from '../../components/NavigationBar';
import NavHeader from '../../components/NavHeader';

export default function Flashcards(props) {
    return (
        <>
            <NavHeader currentUser={props.currentUser} />
            <div className="flex">
                <NavigationBar 
                    highlight="Flashcards"
                />
                <div className="flex-grow">
                    <h1>

                    </h1>
                </div>
            </div>
        </>
    )
}
