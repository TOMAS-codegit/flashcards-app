import { Link } from "react-router-dom";

export default function DeckFolder(props) {
  return (
    <div>
      <Link to={`/yourDecks/learn/${props.id}`} key={props.id} className="rounded shadow p-4 block hover:bg-[#f5d8c8] bg-[#f5e6de] transition">
        <h3 className="text-xl font-semibold">{props.name}</h3>
        <p className="text-gray-600">{props.description}</p>
        <p className="text-gray-400 text-xs">Created: {props.createdAt}</p>
      </Link>
    </div>
  );
}