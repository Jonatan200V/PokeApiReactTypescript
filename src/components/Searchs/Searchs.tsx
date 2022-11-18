import React, { useEffect, useState } from 'react';
import { pokemon } from '../../types/types';
interface SearchsProps {
  pokemon: pokemon;
  searchPokemon: string;
  handleClikcOpenModal: (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ) => void;
}
interface SearchsState {
  value: {
    initialValue: {
      min: number;
      max: number;
    };
    mitValue: {
      min: number;
      max: number;
    };
    endValue: number;
  };
}
const Searchs = ({
  pokemon,
  searchPokemon,
  handleClikcOpenModal,
}: SearchsProps) => {
  const [values, setValues] = useState<SearchsState['value']>({
    initialValue: {
      min: 0,
      max: 0,
    },
    mitValue: {
      min: 0,
      max: 0,
    },
    endValue: 0,
  });
  useEffect(() => {
    if (
      pokemon.name.toLowerCase().indexOf(searchPokemon.toLowerCase()) !== -1
    ) {
      let searchs = pokemon.name
        .toLowerCase()
        .indexOf(searchPokemon.toLowerCase());
      let lengthSearch = searchPokemon.length;
      let lengthValue = searchs + lengthSearch;
      setValues({
        ...values,
        initialValue: {
          ...values.initialValue,
          min: 0,
          max: searchs,
        },
        mitValue: {
          ...values.mitValue,
          min: searchs,
          max: lengthValue,
        },
        endValue: lengthValue,
      });
    }
  }, [searchPokemon]);

  return (
    <div
      className='header__map'
      onClick={() => handleClikcOpenModal(pokemon.id, null)}
    >
      {searchPokemon.length > 0 ? (
        <div>
          <span className='header__span'>
            {pokemon.name
              .slice(values.initialValue.min, values.initialValue.max)
              .replace(pokemon.name[0], pokemon.name[0].toUpperCase())}
          </span>
          <span style={{ background: '#3761a8' }}>
            {pokemon.name
              .slice(values.mitValue.min, values.mitValue.max)
              .replace(pokemon.name[0], pokemon.name[0].toUpperCase())}
          </span>
          <span>{pokemon.name.slice(values.endValue)}</span>
        </div>
      ) : (
        <div>
          {pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase())}
        </div>
      )}
      <img
        className='header__img'
        src={pokemon.images}
        alt={pokemon.name}
        loading='lazy'
      />
    </div>
  );
};

export default Searchs;
