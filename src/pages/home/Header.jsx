import { Notebook } from 'lucide-react';

export default function Header(props) {

    function toggleSignInForm() {
        props.toggleForm();
        props.showSignIn();
    }

    return (
        <header className="bg-[#8d382b] shadow-sm">
            <div className="max-w-8xl mx-auto px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Notebook className="w-6 h-6 text-[#ebd2c7]" />
                    <h1 className="text-2xl font-bold text-[#ebd2c7]">Revu</h1>
                </div>
                <nav className="space-x-6">
                    <button onClick={toggleSignInForm}className="text-[#ebd2c7] hover:text-[#686ba1]">Login</button>
                </nav>
            </div>
      </header>
    )
}