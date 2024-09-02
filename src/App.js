import React, { useState } from "react";
import Card from "./components/card";
import TypesGrid from "./components/typesGrid";
import Stats from "./components/stats";

function App() {
  const [revealType, setRevealType] = useState(() => () => {});

  return (
    <div className="min-h-screen min-w-full bg-orange-200 flex flex-col items-center">
      <div id="container" className="w-full max-w-4xl flex flex-col items-center">
        <div id="title" className="text-3xl mt-1 mb-4">
          <p className="text-5xl font-semibold">Guess the types!</p>
        </div>
        <div className="mr-48">
          <Stats></Stats>
        </div>
        <Card onGuess={setRevealType}></Card>
        <TypesGrid onTypeClick={revealType}></TypesGrid>
      </div>
    </div>
  );
}

export default App;
