import  CustomLetters from "./Letters"
import "./Components.css"

export default function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      <CustomLetters value={value} />
    </button>
  );
}