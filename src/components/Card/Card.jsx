import cover from '../../assets/img/cover.png';
import './Card.css';

function Card({ card, flipped, handleChoice }) {
  return (
    <div id={card.id} className={`card ${flipped && 'flipped'}`}>
      <img src={card.src} alt='card front' className='card-front' />
      <img
        src={cover}
        alt='card back'
        className='card-back'
        onClick={() => handleChoice(card)}
      />
    </div>
  );
}

export default Card;
