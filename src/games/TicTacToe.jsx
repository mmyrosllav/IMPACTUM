import { useState, useEffect, useCallback } from 'react';
import '../styles/games.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
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
  };

  const getAIMove = useCallback((squares) => {
    const emptySquares = squares.map((sq, idx) => sq === null ? idx : null).filter(sq => sq !== null);
    if (emptySquares.length === 0) return null;

    for (let i of emptySquares) {
      const testSquares = [...squares];
      testSquares[i] = 'O';
      if (calculateWinner(testSquares) === 'O') return i;
    }

    for (let i of emptySquares) {
      const testSquares = [...squares];
      testSquares[i] = 'X';
      if (calculateWinner(testSquares) === 'X') return i;
    }

    if (squares[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }, []);

  useEffect(() => {
    if (!isXNext) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, getAIMove]);

  useEffect(() => {
    const w = calculateWinner(board);
    if (w) {
      setWinner(w);
      setGameOver(true);
    } else if (board.every(sq => sq !== null)) {
      setGameOver(true);
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || gameOver || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Tic Tac Toe</h2>
        <p>Play against AI</p>
      </div>

      <div className="tictactoe-board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`tictactoe-cell ${value ? `filled-${value}` : ''} ${gameOver ? 'disabled' : ''}`}
            onClick={() => handleClick(index)}
            disabled={gameOver || !isXNext}
          >
            {value && <span className="cell-value">{value}</span>}
          </button>
        ))}
      </div>

      <div className="game-status">
        {gameOver ? (
          <div className="status-message">
            {winner ? (
              <p className={winner === 'X' ? 'win-text' : 'lose-text'}>
                {winner === 'X' ? '🎉 You Won!' : '🤖 AI Won!'}
              </p>
            ) : (
              <p className="draw-text">🤝 It\'s a Draw!</p>
            )}
          </div>
        ) : (
          <p className="turn-text">Your turn (X)</p>
        )}
      </div>

      <button className="btn btn-reset" onClick={resetGame}>
        {gameOver ? 'Play Again' : 'Reset'}
      </button>
    </div>
  );
};

export default TicTacToe;
