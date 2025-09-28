import { useState } from 'react';
import Square from "./Square";
import './Components.css';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      if (winner === 'X') {
        setPlayerXScore(playerXScore + 1);
      } else if (winner === 'O') {
        setPlayerOScore(playerOScore + 1);
      }
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  let status;
  let winningSquares = [];
  if (winner) {
    status = "Winner: " + winner.player;
    winningSquares = winner.line;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>
        <h2>{status}</h2>
        <div className="board-container">
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
                      winner={winningSquares.includes(index)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="scoreboard">
            <p>Player X: {playerXScore}</p>
            <p>Player O: {playerOScore}</p>
          </div>
        </div>
        <button className="custom-btn" onClick={resetGame}>
          Reset Game
        </button>
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
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
}