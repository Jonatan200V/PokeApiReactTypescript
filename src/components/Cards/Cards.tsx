import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import useFecthPokemons from '../../hooks/useFecthPokemons';
import Card from '../Card/Card';
setTimeout(() => {
  console.clear();
}, 6000);
const Cards = () => {
  useFecthPokemons();
  const { allPokemon, filtersPokemonName } = useAppContext();
  filtersPokemonName();
  return (
    <div className='cards'>
      <Card allPokemon={allPokemon} />
    </div>
  );
};

export default Cards;
