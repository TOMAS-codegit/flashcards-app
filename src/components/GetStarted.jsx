import { ArrowRight } from "lucide-react";
import studying from '../assets/studying.png'

export default function GetStarted(props) {

    function toggleSignUpForm(){
        props.toggleForm();
        props.showSignUp();
    }

    return (
        <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Review Anything with Revu
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Create, learn, and retain knowledge faster with smart flashcards.
                        Learn better. Learn faster.
                    </p>
                    <button
                        onClick={toggleSignUpForm}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                        Get Started <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    <img
                        src= {studying}
                        alt="Flashcard Illustration"
                        className="w-full max-w-md mx-auto"  
                    />
                </div>
            </div>
        </main>
    )
}