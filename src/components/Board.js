import React from 'react';
import CustomButton from './CustomButton';

function CustomLetter({ value }) {
  // You can style or use SVGs for custom letters here
  if (value === 'X') {
    return <span style={{ color: '#e63946', fontWeight: 'bold', fontSize: '2rem' }}>✗</span>;
  }
  if (value === 'O') {
    return <span style={{ color: '#457b9d', fontWeight: 'bold', fontSize: '2rem' }}>◯</span>;
  }
  return null;
}


function Square({ value, onSquareClick }) {
  return (
    <button className={value && value.isWinner ? "custom-square winner-square" : "custom-square"}
      onClick={onSquareClick}
      tabIndex={0}
      aria-label={value ? value.letter : 'empty square'}>
      <CustomLetter value={value ? value.letter : null} />
    </button>
  );
}

export default function Board({ xIsNext, squares, onPlay, onReset }) {
  const winnerInfo = calculateWinner(squares.map(s => s ? s.letter : null));
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = { letter: xIsNext ? 'X' : 'O', isWinner: false };
    onPlay(nextSquares);
  }

  // Mark winning squares
  const displaySquares = squares.map((sq, idx) => {
    if (sq && winningLine.includes(idx)) {
      return { ...sq, isWinner: true };
    }
    return sq;
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map(col => {
            const idx = row * 3 + col;
            return (
              <Square
                key={idx}
                value={displaySquares[idx]}
                onSquareClick={() => handleClick(idx)}
              />
            );
          })}
        </div>
      ))}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <CustomButton onClick={onReset}>Reset Game</CustomButton>
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
