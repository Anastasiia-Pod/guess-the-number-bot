const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let secretNumber = null;

// Endpoint to start a new game
app.post('/start_game', (req, res) => {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  res.sendStatus(200);
});

// Endpoint to check the guessed number
app.post('/guess', (req, res) => {
  if (secretNumber === null) {
    return res.status(400).json({ message: 'Game not started.' });
  }

  const guessedNumber = req.body.number;
  if (guessedNumber === secretNumber) {
    secretNumber = null; 
    res.json({ message: 'correct' });
  } else if (guessedNumber < secretNumber) {
    res.json({ message: 'higher' });
  } else {
    res.json({ message: 'lower' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
