export default function Footer() {
    return (  
        <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Revu. All rights reserved.
        </footer>
    );
}