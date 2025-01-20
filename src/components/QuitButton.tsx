import React from "react";

interface QuitButtonProps {
  onQuit: () => void;
}

const QuitButton = ({ onQuit }: QuitButtonProps) => {
  return (
    <button className="btn btn-danger m-2" onClick={onQuit}>
      Restart
    </button>
  );
};

export default QuitButton;
