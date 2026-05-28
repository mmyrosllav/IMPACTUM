import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TicTacToe from '../games/TicTacToe';
import Snake from '../games/Snake';
import MiniCrossword from '../games/MiniCrossword';
import PageTransition from '../components/PageTransition';
import '../styles/games-hub.css';

const GamesHub = () => {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      emoji: '⭕',
      desc: t('games.tictactoe') || 'Classic game against AI. Can you outsmart the computer?',
      component: TicTacToe,
    },
    {
      id: 'snake',
      name: 'Snake',
      emoji: '🐍',
      desc: t('games.snake') || 'Eat food and grow. Avoid hitting yourself!',
      component: Snake,
    },
    {
      id: 'crossword',
      name: 'Mini Crossword',
      emoji: '📝',
      desc: t('games.crossword') || 'Solve word puzzles and test your vocabulary.',
      component: MiniCrossword,
    },
  ];

  const GameComponent = selectedGame
    ? games.find(g => g.id === selectedGame)?.component
    : null;

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        {!selectedGame ? (
          <>
            <section className="games-header">
              <h1>🎮 {t('games.title')}</h1>
              <p className="games-subtitle">
                {t('games.subtitle')}
              </p>
            </section>

            <div className="games-grid">
              {games.map(game => (
                <div
                  key={game.id}
                  className="game-card"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="game-card-inner">
                    <div className="game-emoji">{game.emoji}</div>
                    <h3>{game.name}</h3>
                    <p>{game.desc}</p>
                    <div className="play-button">{t('games.playButton')}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="game-play-area">
            <button
              className="btn btn-back"
              onClick={() => setSelectedGame(null)}
            >
              ← {t('games.backButton')}
            </button>
            <GameComponent />
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default GamesHub;
