import React, { useEffect, useState } from "react";

const Stats = ({ lives, guessed, record }) => {
    const [livesColor, setLivesColor] = useState("");
    const [guessedColor, setGuessedColor] = useState("");

    useEffect(() => {
        if (lives !== 3) {
            setLivesColor("red");
            const timer = setTimeout(() => {
                setLivesColor("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [lives]);

    useEffect(() => {
        if (guessed > 0) {
            setGuessedColor("green");
            const timer = setTimeout(() => {
                setGuessedColor("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [guessed]);

    return (
        <div>
            <p className="dark:text-neutral-100 text-md" style={{ color: livesColor}}>
                Remaining lives: {lives}
            </p>
            <p className="dark:text-neutral-100 text-md" style={{ color: guessedColor}}>
                Guessed pokémon: {guessed}
            </p>
            <p className="dark:text-neutral-100 text-md">Record: {record}</p>
        </div>
    );
};

export default Stats;
