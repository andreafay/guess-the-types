import React, { useEffect, useState } from "react";

const Stats = ({ lives, guessed }) => {
    const [livesColor, setLivesColor] = useState("black");
    const [guessedColor, setGuessedColor] = useState("black");

    useEffect(() => {
        if (lives !== 3) {
            setLivesColor("red");
            const timer = setTimeout(() => {
                setLivesColor("black");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [lives]);

    useEffect(() => {
        if (guessed > 0) {
            setGuessedColor("green");
            const timer = setTimeout(() => {
                setGuessedColor("black");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [guessed]);

    return (
        <div>
            <p className="text-md" style={{ color: livesColor, transition: "color 0.5s" }}>
                Lives remaining: {lives}
            </p>
            <p className="text-md" style={{ color: guessedColor, transition: "color 0.5s" }}>
                Pokémon guessed: {guessed}
            </p>
            <p className="text-md">Record: </p>
        </div>
    );
};

export default Stats;
