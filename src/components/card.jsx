import React, { useState, useEffect, useCallback, useMemo } from "react";

const Card = ({ onGuess, onCorrectGuess, onIncorrectGuess, onNewPokemon, resetGame }) => {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const [pokeName, setPokeName] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [typeNames, setTypeNames] = useState([]);
    const [revealedTypes, setRevealedTypes] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [newPokeData, setNewPokeData] = useState(null);

    const typeColor = useMemo(() => ({
        bug: "#A6B91A",
        dark: "#705746",
        dragon: "#6F35FC",
        electric: "#F7D02C",
        fairy: "#D685AD",
        fighting: "#C22E28",
        fire: "#EE8130",
        flying: "#A98FF3",
        grass: "#7AC74C",
        ground: "#E2BF65",
        ghost: "#735797",
        ice: "#96D9D6",
        normal: "#A8A77A",
        poison: "#A33EA1",
        psychic: "#F95587",
        rock: "#B6A136",
        steel: "#B7B7CE",
        water: "#6390F0",
    }), []);

    const fetchPokeData = useCallback(async () => {
        setLoading(true);
        setIsVisible(false);

        let id = Math.floor(Math.random() * 1017) + 1;
        const finalUrl = url + id;

        try {
            const response = await fetch(finalUrl);
            const data = await response.json();
            setNewPokeData(data);
        } catch (error) {
            console.error("Failed to fetch Pokémon data:", error);
        }
    }, [url]);

    const generateCard = useCallback((data) => {
        let pokeName = data.name;
        pokeName = pokeName[0].toUpperCase() + pokeName.slice(1).toLowerCase();
        setPokeName(pokeName);
        setImgSrc(data.sprites.front_default);

        const types = data.types.map(typeInfo => typeInfo.type.name);
        const typeColors = types.map(type => ({ name: type, color: typeColor[type] }));

        setTypeNames(typeColors);
        setRevealedTypes([]);
        setIsVisible(true);
        setLoading(false);

        onNewPokemon(pokeName, typeColors); // Notify about the new Pokémon
    }, [typeColor, onNewPokemon]);

    useEffect(() => {
        fetchPokeData();
    }, [fetchPokeData]);

    useEffect(() => {
        if (newPokeData) {
            generateCard(newPokeData);
            setNewPokeData(null);
        }
    }, [newPokeData, generateCard]);

    useEffect(() => {
        if (resetGame) {
            fetchPokeData(); // Fetch a new Pokémon when the game is reset
        }
    }, [resetGame, fetchPokeData]);

    const revealType = useCallback((type) => {
        if (typeNames.some(t => t.name === type)) {
            setRevealedTypes(prevRevealedTypes => {
                const newRevealedTypes = [...new Set([...prevRevealedTypes, type])];

                if (newRevealedTypes.length === typeNames.length) {
                    onCorrectGuess(); // Notify that the Pokémon was guessed correctly
                    setTimeout(() => {
                        fetchPokeData();
                    }, 1000);
                }

                return newRevealedTypes;
            });
        } else {
            onIncorrectGuess(); // Notify that the guess was incorrect
        }
    }, [typeNames, fetchPokeData, onCorrectGuess, onIncorrectGuess]);

    useEffect(() => {
        onGuess(() => revealType);
    }, [typeNames, onGuess, revealType]);

    return (
        <div
            className="p-1 rounded"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s',
                visibility: loading ? 'hidden' : 'visible',
            }}>
            <h2 id="poke-name" className="text-2xl text-center">{pokeName}</h2>
            <img id="sprite" className="w-44 h-44" src={imgSrc} alt={pokeName} />
            <div id="types" className="flex justify-center mt-1 space-x-2">
                {typeNames.map((type, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-white text-center border border-black rounded-2xl"
                        style={{
                            backgroundColor: type.color,
                            visibility: revealedTypes.includes(type.name) ? 'visible' : 'hidden',
                        }}>
                        {type.name[0].toUpperCase() + type.name.slice(1)}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Card;
