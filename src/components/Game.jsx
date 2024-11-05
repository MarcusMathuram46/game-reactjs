import React, { useEffect, useState } from 'react';

function Game() {
  const [hitPosition, setHitPosition] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    let hitInterval;
    if (gameActive) {
      hitInterval = setInterval(() => {
        const randomPosition = Math.floor(Math.random() * 9);
        setHitPosition(randomPosition);

        // Remove "HIT" after 1 second
        setTimeout(() => {
          setHitPosition(null);
        }, 1000);
      }, 1500); // 1.5 seconds interval to create a gap between appearances
    }

    return () => clearInterval(hitInterval);
  }, [gameActive]);

  const handleBoxClick = (index) => {
    if (index === hitPosition) {
      setScore((prevScore) => prevScore + 5);
      setHitPosition(null); // Clear the "HIT" immediately on correct click
    } else {
      setScore((prevScore) => prevScore - 2.5);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Hit the Box Game</h1>
      <p>Time Left: {timeLeft} seconds</p>
      <p>Score: {score}</p>
      {!gameActive && (
        <button onClick={startGame} style={{ padding: '10px', fontSize: '16px' }}>
          Start Game
        </button>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #000',
              fontSize: '24px',
              cursor: 'pointer',
              backgroundColor: index === hitPosition ? '#d3d3d3' : '#fff',
            }}
          >
            {index === hitPosition ? 'HIT' : ''}
          </div>
        ))}
      </div>
      {!gameActive && timeLeft === 0 && <p>Game Over! Final Score: {score}</p>}
    </div>
  );
}

export default Game;
