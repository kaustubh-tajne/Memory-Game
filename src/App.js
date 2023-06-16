import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

// To sort in ascending order
// const shuffleCards = () => {
//   const shuffledCards = [...cardImages, ...cardImages].sort((a,b) => {
//     if (a.src < b.src) {
//       return -1;
//     } else if (a.src > b.src) {
//       return 1;
//     } else {
//       return 0;
//     }
//   })
//   console.log(shuffledCards);
// }
console.log('outside app');

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map((card) => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choice and increase turn`
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  // comapare two seleted cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log('inside app');
  // console.log(cards);
  // console.log(choiceOne);
  // console.log(choiceTwo);

  return (
    <div className="App">
      <div>
        <h1>Magic Memory</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => {
            return (
              <SingleCard
                card={card}
                key={card.id}
                handleChoice={handleChoice}
                flipped={choiceOne === card || choiceTwo === card || card.matched }
                disabled={disabled}
              />
            );
          })}
        </div>

        <h3>Turns: {turns}</h3>
      </div>
    </div>
  );
}

export default App;
