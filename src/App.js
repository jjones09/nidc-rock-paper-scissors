import {useEffect, useState, useRef} from 'react';
import Webcam from 'react-webcam';

import Scoreboard from './Scoreboard.js';

import * as model from './model.js';

import './App.css';

// Show countdown on top of webcam feed
const countDownToPlay = async ({setCountdown}) => Promise.all(
  new Array(4).fill().map(
    async (_, index) => new Promise(resolve => {
      setTimeout(
        () => { 
          console.log(index);
          setCountdown(index);
          resolve();
        }, 
        (3 - index) * 1000
      );
    })
  )
);

// Pick a random choice for the bot
const getBotGuess = (classLabels) => classLabels[Math.floor(Math.random() * 3)];

// Score the round
const determineRoundScore = (playerChoice, botChoice, classes) => {
  // Draw
  if (playerChoice === botChoice) return 0;

  // Player wins
  if (
    (classes.indexOf(playerChoice) === classes.indexOf(botChoice) + 1)
    || (classes.indexOf(playerChoice) === 0 && classes.indexOf(botChoice) === classes.length - 1)
  ) {
    return 1;
  }

  // Bot wins :(
    return -1;
}

// Play a match
const playMatch = ({
  classLabels,
  botScore,
  playerScore,
  setCountdown,
  setBotScore,
  setPlayerScore,
  setPlayerChoice,
  setBotChoice,
  webcamRef,
}) => async () => {
  // 3... 2... 1...
  await countDownToPlay({setCountdown});

  // Get canvas from webcam
  webcamRef.current.getScreenshot();
  const camCanvas = webcamRef.current.canvas;

  // Get player choice
  const playerChoice = await model.getPrediction(camCanvas);
  console.log(`Player chose: ${playerChoice}`);

  // Get bot choice
  const botChoice = getBotGuess(classLabels);
  console.log(`Bot chose: ${botChoice}`);

  // Determine round winner
  const score = determineRoundScore(playerChoice, botChoice, classLabels);
  console.log(score);

  // Update the scores
  if (score === -1) setBotScore(botScore + 1);
  if (score === 1) setPlayerScore(playerScore + 1);

  // Log the last round
  setPlayerChoice(playerChoice);
  setBotChoice(botChoice);
};

const App = () => {
  // Scores
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  // Last plays
  const [playerChoice, setPlayerChoice] = useState();
  const [botChoice, setBotChoice] = useState();

  // Class labels from model ('rock', 'paper', 'scissors')
  const [classLabels, setClassLabels] = useState([]);

  // Countdown (3, 2, 1)
  const [countdown, setCountdown] = useState(0);

  // Webcam ref
  const webcamRef = useRef(null);

  useEffect(() => {
    // Init model on load
    const setupModel = async () => {
      await model.init();
      setClassLabels(model.getClasses());
    }
    setupModel();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Rock Paper Scissors</header>
      <div className="App-body">
        <Scoreboard
          playerScore={playerScore}
          botScore={botScore}
          playerChoice={playerChoice}
          botChoice={botChoice}
        />
        <div className="Cam-wrapper">
          {!!countdown && <div className="Countdown">{countdown}</div>}
          <Webcam
            className="Cam"
            mirrored={true}
            ref={webcamRef}
          />
        </div>
        {!countdown &&
          <div
            className="PlayBtn"
            onClick={playMatch({
              classLabels,
              botScore,
              playerScore,
              setCountdown,
              setPlayerScore,
              setBotScore,
              setPlayerChoice,
              setBotChoice,
              webcamRef,
            })}
          >
            Ready
          </div>
        }
      </div>
    </div>
  );
}

export default App;
