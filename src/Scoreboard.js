import rock from './icons/rock.png';
import paper from './icons/paper.png';
import scissors from './icons/scissors.png';

import './Scoreboard.css';

const choices = {rock, paper, scissors};

export default ({
  playerScore, botScore, playerChoice, botChoice,
}) => (
<div className='Scoreboard'>
  <div className="Score-section">
    <span>Player</span>
    <span>{playerScore}</span>
    <div className="Last-round-choice">
      {
        playerChoice && <img
          src={choices[playerChoice]}
          width="100"
          height="100"
        />
      }
    </div>
  </div>
  <div className="Score-section">
    <span>Bot</span>
    <span>{botScore}</span>
    <div className="Last-round-choice">
      {
        botChoice && <img
          src={choices[botChoice]}
          width="100"
          height="100"
        />
      }
    </div>
  </div>
</div>
);
