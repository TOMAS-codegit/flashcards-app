import NavigationBar from "../../components/NavigationBar";
import studying from "../../assets/studying.png";
import NavHeader from "../../components/NavHeader";

export default function Latest(props) {
  return (
    <>
      <NavHeader currentUser={props.currentUser} />

      <div className="flex">
        <NavigationBar highlight="Home" />
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-[#625866] mb-4">
                Review Anything with Revu
              </h2>
              <p className="text-lg text-[#625866] mb-6">
                Create, learn, and retain knowledge faster with smart
                flashcards. Learn better. Learn faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => (window.location.href = "/yourDecks")}
                  className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition"
                >
                  Study Deck
                </button>
                <button
                  onClick={() => (window.location.href = "/flashcards")}
                  className="inline-flex items-center gap-2 bg-[#5b9aa0] text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-[#4a878a] transition"
                >
                  Create Deck
                </button>
              </div>
            </div>
            <div>
              <img
                src={studying}
                alt="Flashcard Illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
