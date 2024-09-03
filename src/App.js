import React, { useState, useCallback } from "react";
import Card from "./components/card";
import TypesGrid from "./components/typesGrid";
import Stats from "./components/stats";
import GameOver from "./components/GameOver";

function App() {
  const [revealType, setRevealType] = useState(() => () => {});
  const [lives, setLives] = useState(3); // Initial lives
  const [guessed, setGuessed] = useState(0); // Initial guessed Pokémon count
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [lastPokemon, setLastPokemon] = useState({ name: "", types: [] }); // Last Pokémon data
  const [resetGame, setResetGame] = useState(false); // Track if the game should be reset

  const handleIncorrectGuess = useCallback(() => {
    setLives((prevLives) => {
      const newLives = Math.max(prevLives - 1, 0);
      if (newLives === 0) {
        setGameOver(true); // Trigger game over when lives reach 0
      }
      return newLives;
    });
  }, []);

  const handleCorrectGuess = useCallback(() => {
    setGuessed((prevGuessed) => prevGuessed + 1); // Increment guessed Pokémon count
  }, []);

  const handleRestart = useCallback(() => {
    setLives(3); // Reset lives
    setGuessed(0); // Reset guessed count
    setGameOver(false); // Hide game over screen
    setResetGame(true); // Trigger reset for the Card component
  }, []);

  const handleNewPokemon = useCallback((name, types) => {
    setLastPokemon({ name, types }); // Save the last Pokémon's name and types
    setResetGame(false); // Reset game trigger back to false after fetching new Pokémon
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-orange-200 flex flex-col items-center">
      <div id="container" className="w-full max-w-4xl flex flex-col items-center">
        <div id="title" className="mt-1 mb-2">
          <p className="text-4xl font-semibold">Guess the types!</p>
        </div>
        <div className="mr-48">
          <Stats lives={lives} guessed={guessed} />
        </div>
        <Card
          onGuess={setRevealType}
          onCorrectGuess={handleCorrectGuess}
          onIncorrectGuess={handleIncorrectGuess}
          onNewPokemon={handleNewPokemon}
          resetGame={resetGame} // Pass the resetGame state to the Card component
        />
        <TypesGrid onTypeClick={revealType} />
      </div>
      {gameOver && (
        <GameOver
          pokemonName={lastPokemon.name}
          pokemonTypes={lastPokemon.types}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
