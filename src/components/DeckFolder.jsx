import { Folder } from 'lucide-react';

export default function DeckFolder(props) {
    return(
        <>
            <div>
                <li key={props.id} className="bg-[#ebd2c7] rounded shadow p-4">
                    <h3 className="text-xl font-semibold">{props.name}</h3>
                    <p className="text-gray-600">{props.description}</p>
                    <p className="text-xs text-gray-400">
                      Created: {props.createdAt}
                    </p>
                </li>
            </div>
        </>
    )
}