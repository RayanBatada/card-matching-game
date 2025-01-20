import React from "react";

interface CardProps {
  rank: string;
  suit: string;
}

const Card = ({ rank, suit }: CardProps) => {
  const imageName = `Suit=${suit}, Number=${rank}.png`;
  const imagePath = `/cards/${imageName}`; //in the public folder
  return (
    <div className="card-display">
      <img
        src={imagePath}
        alt={`${rank} of ${suit}`}
        style={{
          width: "150px",
          height: "210px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default Card;
