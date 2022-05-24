import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import helmet from './assets/img/helmet-1.png';
import potion from './assets/img/potion-1.png';
import ring from './assets/img/ring-1.png';
import scroll from './assets/img/scroll-1.png';
import shield from './assets/img/shield-1.png';
import sword from './assets/img/sword-1.png';
import Card from './components/Card/Card';

const cardImages = [
  { src: helmet, matched: false },
  { src: potion, matched: false },
  { src: ring, matched: false },
  { src: scroll, matched: false },
  { src: shield, matched: false },
  { src: sword, matched: false },
];

function App() {
  let win = false;
  const maxTurns = 8;
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(() => card) : setChoiceOne(() => card);
    }
  };

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn + 1);
    setDisabled(false);
  };

  const checkIfWin = () => {
    for (let card of cards) {
      if (card.matched) {
        win = true;
      } else {
        win = false;
        break;
      }
    }

    if (win) {
      setGameOver(win);
    }
  };

  const checkIfLose = () => {
    if (turns + 1 === maxTurns) {
      win = false;
      setGameOver(win);
    }
  };

  const setGameOver = (win) => {
    alert(`You ${win ? 'win' : 'lose'}. Hit enter to restart the game.`);
    shuffleCards();
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        resetChoice();
      } else {
        setTimeout(resetChoice, 1000);
      }

      checkIfLose();
      checkIfWin();
    }
  }, [choiceOne, choiceTwo, turns]);

  useEffect(shuffleCards, []);

  return (
    <div className='game-container'>
      <h1 className='game-title'>Magic Match</h1>
      <button className='btn' onClick={shuffleCards}>
        New Game
      </button>
      <p className='max-turns'>Your maximum turns is {maxTurns}.</p>
      <div className='card-grid'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      <p className='turns'>
        Turns: <b>{turns}</b>
      </p>
    </div>
  );
}

export default App;
