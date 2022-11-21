import React from 'react';
import { pokemon } from '../../types/types';
interface PokeOptionsProps {
  pokeOption: pokemon[];
  poke: pokemon;
  handleClick: (name: string) => void;
}
const PokeOptions = ({ pokeOption, poke, handleClick }: PokeOptionsProps) => {
  return (
    <>
      {pokeOption
        .slice(0, 3)
        .concat(poke)
        .sort((a, b) => b.atk.stat - (a.atk.stat - Math.random() - 0.5))
        .map((pokemon) => (
          <li
            key={Math.random() * 100000000}
            className='puzzle__li'
            onClick={() => handleClick(pokemon.name)}
          >
            {pokemon.name}
          </li>
        ))}
    </>
  );
};

export default PokeOptions;
