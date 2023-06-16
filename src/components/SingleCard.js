import React from "react";
// import './SingleCard.css';

console.log("inside single card");
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  console.log("inside single card");

  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          {flipped ? (
            <img className="front" src={card.src} alt="card img" />
          ) : (
            <img
              className="back"
              src="/img/cover.png"
              alt="card img"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SingleCard;
