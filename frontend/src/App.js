import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Start a new game by generating a random number
  const startGame = async () => {
    try {
      await axios.post('http://localhost:5001/start_game');
      setGameStarted(true);
      setGameOver(false);
      setNumber('');
      setMessage('Game started! Please guess a number from 1 to 10.');
    } catch (error) {
      setMessage('Error starting the game.');
    }
  };

  // Check the guessed number
  const guessNumber = async () => {
    try {
      const response = await axios.post('http://localhost:5001/guess', { number: parseInt(number, 10) });
      const result = response.data.message;
      if (result === 'correct') {
        setMessage('You have guessed the number correctly! Click "Start New Game" to play again.');
        setGameStarted(false);
        setGameOver(true);
        setNumber('');
      } else {
        setNumber('');
        setMessage(result === 'higher' ? 'The secret number is higher' : 'The secret number is lower');
      }
    } catch (error) {
      setNumber('');
      setMessage('Error submitting the guess.');
    }
  };

  return (
    <div className="app-container">
      <h1>Guess the Number</h1>
      {gameStarted && !gameOver ? (
        <div className="input-container">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your guess"
          />
          <button onClick={guessNumber}>Submit Guess</button>
        </div>
      ) : (
        <div>
          <button onClick={startGame}>Start New Game</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default App;



