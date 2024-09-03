import React from "react";

const TypesGrid = ({ onTypeClick }) => {
    const typeColor = {
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
    };

    return (
        <div className="grid grid-cols-3 gap-1 mt-6">
            {Object.keys(typeColor).map((type, index) => (
                <button
                    key={index}
                    className="px-3 py-1 text-white text-center border border-black rounded-2xl m-1"
                    style={{ backgroundColor: typeColor[type] }}
                    onClick={() => onTypeClick(type)}>
                    {type[0].toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default TypesGrid;
