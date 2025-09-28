import CustomLetters from "./Letters";
import "./Components.css";

export default function Square({ value, onClick, winner }) {
  return (
    <button
      className={`square ${winner ? "winner-square" : ""}`}
      onClick={onClick}
    >
      <CustomLetters value={value} />
    </button>
  );
}