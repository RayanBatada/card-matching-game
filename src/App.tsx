import React, { useEffect, useState } from "react";

import Scoreboard from "./components/Scoreboard";
import GameMessages from "./components/GameMessages";
import DrawCardButton from "./components/DrawCardButton";
import QuitButton from "./components/QuitButton";
import ShuffleButton from "./components/ShuffleButton";
import Card from "./components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // State for the deck, score, and game messages
  const [deck, setDeck] = useState<{ rank: string; suit: string }[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Welcome to the Card Matching Game!");
  const [firstCard, setFirstCard] = useState<{
    rank: String;
    suit: string;
  } | null>(null);
  const [secondCard, setSecondCard] = useState<{
    rank: String;
    suit: string;
  } | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  // Define suits and ranks for the deck
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  const initializeDeck = () => {
    const newDeck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({ rank, suit }); // Create each new card (loops 4 times cuz 4 suits)
      }
    }
    setDeck(shuffleDeck(newDeck)); // Shuffles the newDeck and updates the deck
    setFirstCard(null);
    setSecondCard(null);
  };

  const shuffleDeck = (cards: { rank: string; suit: string }[]) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
    }

    return shuffled;
  };

  const drawCards = () => {
    if (isCooldown) return; // Prevent action if cooldown is active
    setIsCooldown(true);

    if (deck.length < 2) {
      setIsShuffling(true); // start the shuffling animation
      setMessage(
        "Not enough cards in the deck to continue. Replenishing deck..."
      );
      setFirstCard(null);
      setSecondCard(null);
      setTimeout(() => {
        initializeDeck();
        setIsShuffling(false);
        setIsCooldown(false);
        setMessage("The deck is ready. You can continue!");
      }, 2000); // 2 second pause (2000 ms)
      return;
    }

    const first = deck.pop(); // Removes the last card of the deck
    const second = deck.pop();
    setDeck([...deck]);
    setFirstCard(first || null);
    setSecondCard(second || null);

    const firstColor =
      first.suit == "Clubs" || first.suit == "Spades" ? "Black" : "Red";
    const secondColor =
      second.suit == "Clubs" || second.suit == "Spades" ? "Black" : "Red";

    const firstMessageVariable = first.rank == "8" ? "an" : "a";
    const secondMessageVariable = second.rank == "8" ? "an" : "a";

    if (
      first.rank == second.rank ||
      first.suit == second.rank ||
      firstColor == secondColor
    ) {
      setScore(score + 1);
      setMessage(
        `Match! You drew ${firstMessageVariable} ${first.rank} of ${first.suit} and ${secondMessageVariable} ${second.rank} of ${second.suit}.`
      );
    } else {
      setMessage(
        `No match. You drew ${firstMessageVariable} ${first.rank} of ${first.suit} and ${secondMessageVariable} ${second.rank} of ${second.suit}.`
      );
    }
    setTimeout(() => setIsCooldown(false), 100);
  };

  const quitGame = () => {
    setMessage("Score and deck have been reset!");
    setScore(0);
    initializeDeck();
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  return (
    <div className="game-container">
      <h1 className="game-title">Card Matching Game</h1>
      <Scoreboard score={score} />
      <GameMessages message={message} />
      <div className="row my-4">
        <>
          <div className="col-auto">
            {firstCard ? (
              <Card rank={firstCard.rank} suit={firstCard.suit} />
            ) : (
              <div className="card-placeholder card-scaled">Card 1</div>
            )}
          </div>
          <div className="col-auto">
            <img src="/cards/back.png" alt="Deck" className="deck-image" />
          </div>
          <div className="col-auto">
            {secondCard ? (
              <Card rank={secondCard.rank} suit={secondCard.suit} />
            ) : (
              <div className="card-placeholder card-scaled">Card 2</div>
            )}
          </div>
        </>
      </div>
      <div className="actions mt-3">
        <ShuffleButton onShuffle={initializeDeck} />
        <DrawCardButton onDraw={drawCards} />
        <QuitButton onQuit={quitGame} />
      </div>
    </div>
  );
}

export default App;
