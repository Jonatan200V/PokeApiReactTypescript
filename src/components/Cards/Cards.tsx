import { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import useFecthPokemons from '../../hooks/useFecthPokemons';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Help from '../Help/Help';

const Cards = () => {
  const { allPokemon, pokemonsFilters, typesFilters, addTypes } =
    useAppContext();
  useFecthPokemons();
  const [v, set] = useState(false);
  useEffect(() => {
    if (allPokemon.length === 100 && v === false) {
      addTypes();
      set(true);
    }
  }, [v, addTypes, allPokemon]);
  return (
    <div className='cards'>
      <Help />
      {typesFilters.length >= 1 ? (
        <Card allPokemon={pokemonsFilters} />
      ) : (
        <Card allPokemon={allPokemon} />
      )}
      <Filter />
    </div>
  );
};

export default Cards;
