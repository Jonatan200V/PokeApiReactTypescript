import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { pokemon } from '../../types/types';
import Searchs from '../Searchs/Searchs';
interface HeaderState {
  search: string;
  pokemon: pokemon[];
  view: number;
}

const Header = () => {
  const { allPokemon, handleClikcOpenModal } = useAppContext();

  const [searchPokemon, setSearchPokemon] = useState<HeaderState['search']>('');

  const [pokemonsFiltered, setPokemonsFiltered] = useState<
    HeaderState['pokemon']
  >([]);

  const [view, setView] = useState<HeaderState['view']>(0);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = evt.currentTarget;
    setSearchPokemon(value);
    const pokemonFiltered = allPokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setPokemonsFiltered(pokemonFiltered);
    if (value.length > 0 && pokemonFiltered.length > 0) {
      return setView(1);
    }
    setView(0);
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
    </div>
  );
};

export default Header;
