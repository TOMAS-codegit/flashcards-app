export default function Footer() {
    return (  
        <footer className="bg-[#ebd2c7] border-t border-[#5b9aa0] py-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Revu. All rights reserved.
        </footer>
    );
}