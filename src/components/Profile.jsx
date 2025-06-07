import { auth } from '../firebase';

export default function Profile({ user }) {

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.reload(); // simple way to refresh UI after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (!user) {
        return null; // or a placeholder/loading state
    }

    return (
        <div className='fixed top-16 right-0 p-4 bg-[#ebd2c7]/90 z-50 w-64 rounded shadow-lg'>
            <p className='font-bold'>Username: {user.displayName || 'N/A'}</p>
            <p className='text-sm'>Email: {user.email}</p>
            <button
                onClick={handleLogout}
                className='mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
            >
                Logout
            </button>
        </div>
    );
}
