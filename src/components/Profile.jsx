import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }

    navigate("/");
  };

  if (!props.user) {
    return null; // or a placeholder/loading state
  }

  return (
    <div className="fixed top-16 right-0 p-4 bg-[#ebd2c7]/90 z-50 w-64 rounded shadow-lg">
      <p className="font-bold">Username: {props.user.displayName}</p>
      <p className="text-sm">Email: {props.user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
