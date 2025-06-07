export default function NavComponents(props) {
  const highlightStyle = props.highlight
    ? "bg-[#686ba1] text-[#ebd2c7] hover:text-black"
    : "";

  return (
    <div
      onClick={props.onClick}
      className={`text-[#ebd2c7] ${highlightStyle} text-2xl hover:text-[#686ba1] flex items-center gap-2 p-2 rounded-md cursor-pointer`}
    >
      {props.icon}
      <span>{props.text}</span>
    </div>
  );
}
