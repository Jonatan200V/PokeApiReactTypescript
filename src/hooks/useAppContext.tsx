import React, { createContext, useContext, useState } from 'react';
import { nextPrev, pokemon } from '../types/types';
import { isNumber } from '../utils/types/types';
import { shuffle } from '../utils/sufle';
interface PokemonStore {
  addPokemon: (poke: pokemon[]) => void;
  changeCardModal: (id: number, name: nextPrev) => void;
  filterTypes: (type: string) => void;
  handleClikcOpenModal: (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ) => void;
  addTypes: () => void;
  pokemonsMemory: () => void;
  allPokemon: pokemon[];
  modal: boolean;
  cardModal: pokemon[];
  memoryPoke: pokemon[];
  types: string[];
  typesFilters: string[];
  pokemonsFilters: pokemon[];
}
interface ContextState {
  allPokemon: pokemon[];
  modal: boolean;
  cardModal: pokemon[];
  types: string[];
  filterTypes: string[];
}
interface context {
  children: React.ReactNode;
}
const contextApp: PokemonStore = {
  allPokemon: [],
  pokemonsFilters: [],
  memoryPoke: [],
  modal: true,
  cardModal: [],
  types: [],
  typesFilters: [],
  changeCardModal: (id: number, name: nextPrev) => {},
  addPokemon: (poke: pokemon[]) => {},
  pokemonsMemory: () => {},
  handleClikcOpenModal: (
    id: number | boolean,
    divRef: HTMLDivElement | null
  ) => {},
  addTypes: () => {},
  filterTypes: (type: string) => {},
};

const AppContext = createContext(contextApp);

export const AppContextStore = ({ children }: context) => {
  const [allPokemon, setAllPokemon] = useState<ContextState['allPokemon']>([]);
  const [cardModal, setCardModal] = useState<ContextState['cardModal']>([]);
  const [memoryPoke, setMemoryPoke] = useState<ContextState['allPokemon']>([]);
  const [modal, setModal] = useState<ContextState['modal']>(false);
  const [types, setTypes] = useState<ContextState['types']>([]);
  const [typesFilters, setTypesFilters] = useState<ContextState['filterTypes']>(
    []
  );
  const [pokemonsFilters, setPokemonsFilters] = useState<
    ContextState['allPokemon']
  >([]);
  const addPokemon = (newPoke: pokemon[]): void => {
    setAllPokemon((poke) => poke.concat(newPoke));
  };

  const existPokemonMemory = (poke: pokemon, pokeMemo: pokemon[]): boolean => {
    const exist = pokeMemo.find((pokemon) => pokemon.name === poke.name);
    if (exist) return true;
    return false;
  };
  const pokemonsMemory = (): void => {
    const pokeMemory: pokemon[] = [];
    setMemoryPoke(() => []);

    while (pokeMemory.length < 8) {
      const poke = allPokemon[Math.floor(Math.random() * allPokemon.length)];
      if (existPokemonMemory(poke, pokeMemory)) {
      } else {
        pokeMemory.push(poke);
      }
    }
    const pokemonsShuffle = shuffle([...pokeMemory, ...pokeMemory]);
    setMemoryPoke(() => pokemonsShuffle);
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
  const changeCardModal = (id: number, name: nextPrev) => {
    const pokemonModalCard = allPokemon.findIndex(
      (pokemon) => pokemon.id === id
    );
    if (name === 'next') {
      if (id === 100) return;
      return setCardModal([allPokemon[pokemonModalCard + 1]]);
    }
    if (id === 1) return;
    return setCardModal([allPokemon[pokemonModalCard - 1]]);
  };
  const addTypes = () => {
    let allTypes: string[] = [];
    allPokemon.forEach((pokemon) => {
      allTypes.push(...pokemon.typesAll);
    });
    let hash: any = {};

    const TYPESALL = allTypes.filter((type) =>
      hash[type] ? false : (hash[type] = true)
    );
    setTypes(TYPESALL);
  };
  const filterTypes = (type: string): void => {
    const typeExist = typesFilters.find((fil) => fil === type);
    if (!typeExist && typesFilters.length < 2) {
      if (typesFilters.length === 1) {
        const pokemonsFilter = pokemonsFilters.filter(
          (pokemon) =>
            pokemon?.typesAll[1] === type || pokemon.typesAll[0] === type
        );
        setTypesFilters([...typesFilters, type]);
        return setPokemonsFilters(pokemonsFilter);
      }
      const pokemonsFilter = allPokemon.filter((pokemon) => {
        if (pokemon.typesAll[0] === type || pokemon.typesAll[1] === type) {
          return pokemon;
        }
        return false;
      });
      setPokemonsFilters(pokemonsFilter);
      return setTypesFilters([...typesFilters, type]);
    }
    if (typeExist) {
      const typeFilter = typesFilters.filter((fil) => fil !== type);
      const pokemonFilter = allPokemon.filter((pokemon) => {
        if (
          pokemon.typesAll[0] === typeFilter[0] ||
          pokemon.typesAll[1] === typeFilter[0]
        ) {
          return pokemon;
        }
        return false;
      });
      const newFilters = typesFilters.filter((fil) => fil !== type);
      setPokemonsFilters(pokemonFilter);
      setTypesFilters(newFilters);
    }
  };
  return (
    <AppContext.Provider
      value={{
        allPokemon,
        memoryPoke,
        pokemonsMemory,
        pokemonsFilters,
        modal,
        cardModal,
        types,
        typesFilters,
        addTypes,
        addPokemon,
        handleClikcOpenModal,
        changeCardModal,
        filterTypes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
