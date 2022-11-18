import React, { createContext, useContext, useState } from 'react';
import { pokemon } from '../types/types';
import { isNumber } from '../utils/types/types';
interface PokemonStore {
  allPokemon: pokemon[];
  addPokemon: (poke: pokemon[]) => void;
  filtersPokemonName: () => void;
  handleClikcOpenModal: (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ) => void;
  modal: boolean;
  cardModal: pokemon[];
}
interface ContextState {
  allPokemon: pokemon[];
  modal: boolean;
  cardModal: pokemon[];
}
interface context {
  children: React.ReactNode;
}
const contextApp: PokemonStore = {
  allPokemon: [],
  addPokemon: (poke: pokemon[]) => {},
  filtersPokemonName: () => {},
  handleClikcOpenModal: (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ) => {},
  modal: true,
  cardModal: [],
};
const AppContext = createContext(contextApp);
//TODO ESTOY UTILIZANDO DOS ANY AVERIGUAR COMO PONERLO BIEN
export const AppContextStore = ({ children }: context) => {
  const [allPokemon, setAllPokemon] = useState<ContextState['allPokemon']>([]);
  const [cardModal, setCardModal] = useState<ContextState['cardModal']>([]);
  const [modal, setModal] = useState<ContextState['modal']>(false);
  const addPokemon = (newPoke: pokemon[]) => {
    setAllPokemon((poke) => poke.concat(newPoke));
  };
  const filtersPokemonName = () => {
    if (allPokemon.length > 100) {
      let hash: any = {};
      const pokemonsFiltered = allPokemon.filter((pokemon) =>
        hash[pokemon.id] ? false : (hash[pokemon.id] = true)
      );
      setAllPokemon(pokemonsFiltered);
    }
  };
  const handleClikcOpenModal = (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ): void => {
    const isItNumber = isNumber(id);
    if (isItNumber) {
      const pokemonModalCard = allPokemon.findIndex(
        (pokemon) => pokemon.id === id
      );
      setCardModal([allPokemon[pokemonModalCard]]);
      setModal(!modal);
    } else {
      divRef?.classList.add('card__modal-close');
      setCardModal([]);
      setTimeout(() => {
        divRef?.classList.remove('card__modal-close');
        setModal(!modal);
      }, 400);
    }
  };
  return (
    <AppContext.Provider
      value={{
        allPokemon,
        addPokemon,
        filtersPokemonName,
        handleClikcOpenModal,
        modal,
        cardModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
