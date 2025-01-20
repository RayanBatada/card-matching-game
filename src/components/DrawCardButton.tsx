import React from "react";

interface DrawCardButtonProps {
  onDraw: () => void;
}

const DrawCardButton = ({ onDraw }: DrawCardButtonProps) => {
  return (
    <button className="btn btn-primary m-2" onClick={onDraw}>
      Draw Cards
    </button>
  );
};

export default DrawCardButton;
