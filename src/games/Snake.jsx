import { useState, useEffect, useCallback } from 'react';
import '../styles/games.css';

const Snake = () => {
  const GRID_SIZE = 20;
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [nextDirection, setNextDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    return [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
  }, []);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setNextDirection([0, 1]);
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      switch (key) {
        case 'ArrowUp':
          if (direction[0] === 0) setNextDirection([-1, 0]);
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (direction[0] === 0) setNextDirection([1, 0]);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (direction[1] === 0) setNextDirection([0, -1]);
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (direction[1] === 0) setNextDirection([0, 1]);
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setSnake((prevSnake) => {
        setDirection(nextDirection);
        const head = prevSnake[0];
        const newHead = [
          (head[0] + nextDirection[0] + GRID_SIZE) % GRID_SIZE,
          (head[1] + nextDirection[1] + GRID_SIZE) % GRID_SIZE,
        ];

        if (prevSnake.some(seg => seg[0] === newHead[0] && seg[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(generateFood());
          setScore(prev => prev + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameOver, nextDirection, food, generateFood]);

  const handleDirectionChange = (newDir) => {
    if ((direction[0] === 0 && newDir[0] === 0) || (direction[1] === 0 && newDir[1] === 0)) {
      setNextDirection(newDir);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score-display">
          <h2>Snake</h2>
          <span className="score">Score: {score}</span>
        </div>
        <p>Eat food, grow longer, don't hit yourself!</p>
      </div>

      <div className="snake-grid">
        {Array.from({ length: GRID_SIZE }).map((_, row) =>
          Array.from({ length: GRID_SIZE }).map((_, col) => {
            const isSnakeHead = snake[0][0] === row && snake[0][1] === col;
            const isSnakeBody = snake.slice(1).some(seg => seg[0] === row && seg[1] === col);
            const isFood = food[0] === row && food[1] === col;

            return (
              <div
                key={`${row}-${col}`}
                className={`grid-cell ${isSnakeHead ? 'snake-head' : ''} ${
                  isSnakeBody ? 'snake-body' : ''
                } ${isFood ? 'food' : ''}`}
              />
            );
          })
        )}
      </div>

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
          </div>
        </div>
      )}

      <div className="controls">
        <button className="control-btn up" onClick={() => handleDirectionChange([-1, 0])}>
          ⬆️
        </button>
        <div>
          <button className="control-btn left" onClick={() => handleDirectionChange([0, -1])}>
            ⬅️
          </button>
          <button className="control-btn down" onClick={() => handleDirectionChange([1, 0])}>
            ⬇️
          </button>
          <button className="control-btn right" onClick={() => handleDirectionChange([0, 1])}>
            ➡️
          </button>
        </div>
      </div>

      <button className="btn btn-reset" onClick={resetGame}>
        {gameOver ? 'Play Again' : 'Reset'}
      </button>
    </div>
  );
};

export default Snake;
