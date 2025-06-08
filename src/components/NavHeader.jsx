import { Notebook } from "lucide-react";
import React from "react";
import Profile from "./Profile";

export default function NavHeader(props) {
  const [showProfile, setShowProfile] = React.useState(false);

  function toggleProfile() {
    setShowProfile(!showProfile);
    console.log(props.currentUser);
  }

  function toggleSignInForm() {
    if (props.toggleForm) {
      props.toggleForm();
    }
    if (props.showSignIn) {
      props.showSignIn();
    }
  }

  return (
    <div className="flex flex-col">
      <header className="bg-[#8d382b] shadow-sm">
        <div className="max-w-8xl mx-auto pl-5 pr-10 py-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Notebook className="w-6 h-6 text-[#ebd2c7]" />
            <h1 className="text-2xl font-bold text-[#ebd2c7]">Revu</h1>
          </div>

          {/* maybe add search bar if may time pa */}

          <div className="space-x-6">
            {props.currentUser ? (
              <button
                onClick={toggleProfile}
                className="text-[#ebd2c7] hover:text-[#686ba1]"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={toggleSignInForm}
                className="text-[#ebd2c7] hover:text-[#686ba1]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      {showProfile && <Profile user={props.currentUser} />}
    </div>
  );
}
