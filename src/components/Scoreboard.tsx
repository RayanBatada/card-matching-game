import React from "react";

interface ScoreboardProps {
  score: number;
}

const Scoreboard = ({ score }: ScoreboardProps) => {
  return (
    <div className="Scoreboard">
      <h2>{score}</h2>
    </div>
  );
};

export default Scoreboard;
