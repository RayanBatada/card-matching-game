import React from "react";

interface GameMessagesProps {
  message: string;
}

const GameMessages = ({ message }: GameMessagesProps) => {
  return (
    <div className="game-messages">
      <p>{message}</p>
    </div>
  );
};

export default GameMessages;
