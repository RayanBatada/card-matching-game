import React from "react";

interface ShuffleButtonProps {
  onShuffle: () => void;
}

const ShuffleButton = ({ onShuffle }: ShuffleButtonProps) => {
  return (
    <button className="btn btn-secondary m-2" onClick={onShuffle}>
      Shuffle
    </button>
  );
};

export default ShuffleButton;
