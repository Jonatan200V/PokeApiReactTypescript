import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { pokemon } from '../../types/types';
import Filters from '../Filters/Filters';
import Searchs from '../Searchs/Searchs';
interface HeaderState {
  search: string;
  pokemon: pokemon[];
  view: number;
}

const Header = () => {
  const { allPokemon, typesFilters, pokemonsFilters, handleClikcOpenModal } =
    useAppContext();
  const [searchPokemon, setSearchPokemon] = useState<HeaderState['search']>('');

  const [pokemonsFiltered, setPokemonsFiltered] = useState<
    HeaderState['pokemon']
  >([]);

  const [view, setView] = useState<HeaderState['view']>(0);
  const prueba = (value: string, pokemosAll: pokemon[]): void => {
    const pokemonFiltered = pokemosAll.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setPokemonsFiltered(pokemonFiltered);
    if (value.length > 0 && pokemonFiltered.length > 0) {
      return setView(1);
    }
    setView(0);
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = evt.currentTarget;
    setSearchPokemon(value);
    if (typesFilters.length > 0) {
      return prueba(value, pokemonsFilters);
    }
    prueba(value, allPokemon);
  };

  const handleOnBlur = () => {
    setView(0);
  };

  const handleOnFocus = () => {
    if (pokemonsFiltered.length > 0) {
      setView(1);
    }
  };

  return (
    <div className='header'>
      <Filters value={0} value2={8} />
      <header className='header__header'>
        <div className='header__div'>
          <input
            value={searchPokemon}
            onChange={handleChange}
            type='text'
            className='header__input'
            placeholder='Buscar Pokemon'
            onBlur={() => handleOnBlur()}
            onFocus={() => handleOnFocus()}
          />
          <div className='header__barra' style={{ opacity: view }}>
            {pokemonsFiltered.map((pokemon) => (
              <Searchs
                handleClikcOpenModal={handleClikcOpenModal}
                key={pokemon.id}
                pokemon={pokemon}
                searchPokemon={searchPokemon}
              />
            ))}
          </div>
        </div>
      </header>
      <Filters value={8} value2={16} />
    </div>
  );
};

export default Header;
