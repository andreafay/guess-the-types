import React, { useState, useEffect, useCallback } from "react";
import Card from "./components/card";
import TypesGrid from "./components/typesGrid";
import Stats from "./components/stats";
import GameOver from "./components/GameOver";

function App() {
  const [revealType, setRevealType] = useState(() => () => {});
  const [lives, setLives] = useState(3);
  const [guessed, setGuessed] = useState(0);
  const [record, setRecord] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastPokemon, setLastPokemon] = useState({ name: "", types: [] });
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    const savedRecord = localStorage.getItem('record');
    if (savedRecord) {
        setRecord(Number(savedRecord));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('record', record);
  }, [record]);

  const handleIncorrectGuess = useCallback(() => {
    setLives((prevLives) => {
      const newLives = Math.max(prevLives - 1, 0);
      if (newLives === 0) {
        setGameOver(true);
      }
      return newLives;
    });
  }, []);

  const handleCorrectGuess = useCallback(() => {
    setGuessed((prevGuessed) => {
      const newGuessed = prevGuessed + 1;
      // Check and update record
      if (newGuessed > record) {
        setRecord(newGuessed);
      }
      return newGuessed;
    });
  }, [record]);

  const handleRestart = useCallback(() => {
    setLives(3);
    setGuessed(0);
    setGameOver(false);
    setResetGame(true);
  }, []);

  const handleNewPokemon = useCallback((name, types) => {
    setLastPokemon({ name, types });
    setResetGame(false);
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-orange-200 flex flex-col items-center">
      <div id="container" className="w-full max-w-4xl flex flex-col items-center">
        <div id="title" className="my-1">
          <p className="text-4xl font-semibold">Guess the types!</p>
        </div>
        <div className="mr-48">
          <Stats lives={lives} guessed={guessed} record={record} />
        </div>
        <Card
          onGuess={setRevealType}
          onCorrectGuess={handleCorrectGuess}
          onIncorrectGuess={handleIncorrectGuess}
          onNewPokemon={handleNewPokemon}
          resetGame={resetGame}
        />
        <TypesGrid onTypeClick={revealType} />
      </div>
      {gameOver && (
        <GameOver
          guessed={guessed}
          pokemonName={lastPokemon.name}
          pokemonTypes={lastPokemon.types}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
