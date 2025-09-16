import { useState } from 'react';
import './Board.css'

function CustomLetter(props) {
  // You can style or use SVGs for custom letters here
  if (props.value === 'X') {
    return <img src='/assets/letters/X.png' alt={props.value} />;
  }
  if (props.value === 'O') {
    return <img src='assets/letters/O.png' alt={props.value} />;
  }
  return null;
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      <CustomLetter value={value} />
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (index) => {
    if(squares[index] || calculateWinner(squares)) return; // Ignore if already filled

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>
        <h2>{status}</h2>
        <div className="board">
          {[0, 1, 2].map((row) => (
            <div className="board-row" key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <Square
                    key={index}
                    value={squares[index]}
                    onClick={() => handleClick(index)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} 