import { Trash2 } from "lucide-react";

export default function CreateCard(props) {
  console.log("create card loaded");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="w-sm">
          <textarea
            name="term"
            className="mb-2 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-[#5b9aa0] focus:border-[#5b9aa0] resize-none"
            placeholder="Enter Term"
            value={props.answer}
            onChange={e => props.onChangeAnswer(e.target.value)}
          ></textarea>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-gray-700"
          >
            TERM
          </label>
        </div>
        <div className="w-lg">
          <textarea
            name="description"
            className="mb-2 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-[#5b9aa0] focus:border-[#5b9aa0] resize-none"
            placeholder="Enter Description"
            value={props.question}
            onChange={e => props.onChangeQuestion(e.target.value)}
          ></textarea>
          <div className="flex flex-row space-between w-full justify-between items-center">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              DESCRIPTION
            </label>
            <Trash2
              className="text-white bg-[#bd4040] p-1 rounded-md cursor-pointer"
              onClick={() => props.deleteCard(props.cardId)}
            />
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
}
