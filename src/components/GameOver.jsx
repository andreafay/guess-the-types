import React from "react";

const GameOver = ({ guessed, pokemonName, pokemonTypes, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-200 dark:bg-neutral-900 p-6 rounded-lg text-center text-neutral-900 dark:text-neutral-200 border border-black dark:border-white">
        <h2 className="text-3xl font-semibold mb-4">You lost!</h2>
        <p className="text-xl">You guessed {guessed} pokémon</p>
        <p className="text-xl">Last pokémon was {pokemonName}</p>
        <div className="mt-4">
          {pokemonTypes.map((type, index) => (
            <span
              key={index}
              className="inline-block px-4 py-1 text-white text-center border border-black dark:border-white rounded-2xl mx-1"
              style={{ backgroundColor: type.color }} >
              {type.name[0].toUpperCase() + type.name.slice(1)}
            </span>
          ))}
        </div>
        <button
          onClick={onRestart}
          className="mt-6 px-4 py-2 bg-orange-500 text-white border border-black dark:border-white rounded-lg">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
