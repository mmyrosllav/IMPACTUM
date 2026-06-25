import { useState } from 'react';
import '../styles/games.css';

const MiniCrossword = () => {
  const puzzleData = {
    grid: [
      ['G', 'R', 'A', 'N', 'T'],
      ['R', '.', '.', '.', 'E'],
      ['E', '.', '.', '.', 'A'],
      ['E', '.', '.', '.', 'M'],
      ['N', 'E', 'E', 'D', 'S'],
    ],
    clues: {
      across: [
        { num: 1, text: 'Money for projects', answer: 'GRANT' },
        { num: 5, text: 'Opposite of lose', answer: 'TEAM' },
      ],
      down: [
        { num: 1, text: 'Natural looking color', answer: 'GREEN' },
        { num: 2, text: 'Opposite of few', answer: 'READ' },
        { num: 3, text: 'Opposite of sad', answer: 'AMEN' },
      ],
    },
  };

  const [grid, setGrid] = useState(
    puzzleData.grid.map(row => row.map(cell => (cell === '.' ? { char: '', revealed: false } : { char: cell, revealed: true })))
  );
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState(0);

  const handleInputChange = (row, col, value) => {
    if (grid[row][col].revealed) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col].char = value.toUpperCase().slice(-1);
    setGrid(newGrid);

    const allFilled = newGrid.every(r => r.every(cell => cell.char !== ''));
    if (allFilled) {
      const isCorrect = newGrid.every((r, rIdx) =>
        r.every((cell, cIdx) => cell.char === puzzleData.grid[rIdx][cIdx])
      );
      if (isCorrect) {
        setSolved(true);
        setScore(100);
      }
    }
  };

  const resetPuzzle = () => {
    setGrid(
      puzzleData.grid.map(row =>
        row.map(cell => (cell === '.' ? { char: '', revealed: false } : { char: cell, revealed: true }))
      )
    );
    setSolved(false);
    setScore(0);
  };

  return (
    <div className="game-container game-wide">
      <div className="game-header">
        <h2>Mini Crossword</h2>
        <p>Fill in the blanks</p>
      </div>

      <div className="crossword-wrapper">
        <div className="crossword-grid">
          {grid.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div key={`${rIdx}-${cIdx}`} className="crossword-cell">
                {cell.revealed ? (
                  <div className="revealed-cell">{cell.char}</div>
                ) : (
                  <input
                    type="text"
                    maxLength="1"
                    value={cell.char}
                    onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                    className="input-cell"
                    disabled={solved}
                  />
                )}
              </div>
            ))
          )}
        </div>

        <div className="clues">
          <div className="clue-section">
            <h4>Across</h4>
            {puzzleData.clues.across.map((clue, idx) => (
              <p key={idx}>
                <strong>{clue.num}.</strong> {clue.text}
              </p>
            ))}
          </div>
          <div className="clue-section">
            <h4>Down</h4>
            {puzzleData.clues.down.map((clue, idx) => (
              <p key={idx}>
                <strong>{clue.num}.</strong> {clue.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {solved && (
        <div className="solved-message">
          <p>🎉 Puzzle Solved! Score: {score}</p>
        </div>
      )}

      <button className="btn btn-reset" onClick={resetPuzzle}>
        {solved ? 'New Puzzle' : 'Reset'}
      </button>
    </div>
  );
};

export default MiniCrossword;
