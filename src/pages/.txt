import React, { useEffect, useRef, useState } from 'react';
import Decrementador from '../components/Decrementador/Decrem/Decrementador';
import ModalResult from '../components/ModalResult/ModalResult';
import { useAppContext } from '../hooks/useAppContext';
import { pokemon } from '../types/types';
interface Memory {
  nameMemory: string | null;
  id: number;
  asertions?: boolean;
}
interface PuzzleMemoryState {
  asertions: {
    view: string;
    result: string;
    gameOver: boolean;
  };
  reset: boolean;
}
let gameMemory: Memory = {
  nameMemory: null,
  id: 0,
  asertions: false,
};
let gameMemory2: Memory = {
  nameMemory: null,
  id: 0,
  asertions: false,
};
let valuePrev: HTMLDivElement;
let valuePrev2: HTMLDivElement;
const PuzzleMemory = () => {
  const { allPokemon } = useAppContext();
  const divRef = useRef<HTMLDivElement>(null);
  const [reset, setReset] = useState<PuzzleMemoryState['reset']>(false);
  const [game, setGame] = useState<PuzzleMemoryState['asertions']>({
    view: '',
    result: '',
    gameOver: false,
  });
  useEffect(() => {
    const $allCard = document.querySelectorAll('.memory__card');
    $allCard.forEach((card) => {
      card.classList.remove('memory__card');
    });
  }, [reset]);
  const pokeMemory: pokemon[] = [];
  const pokeMemory2: pokemon[] = [];
  const asertion: boolean[] = [];

  const existPokemonMemory = (poke: pokemon): boolean => {
    const exist = pokeMemory.find((pokemon) => pokemon.name === poke.name);
    if (exist) return true;
    return false;
  };
  while (pokeMemory.length < 8) {
    const poke = allPokemon[Math.floor(Math.random() * allPokemon.length)];
    if (existPokemonMemory(poke)) {
    } else {
      pokeMemory.push(poke);
      pokeMemory2.push(poke);
    }
  }
  const pokemos = pokeMemory.concat(pokeMemory2);
  const handleClick = (
    name: string,
    id: number,
    evt: React.MouseEvent<HTMLDivElement>
  ): string | null => {
    if (gameMemory.nameMemory !== null && gameMemory2.nameMemory !== null) {
      return null;
    }
    evt.currentTarget.classList.add('memory__card');
    if (gameMemory.nameMemory !== null) {
      // Le damos valores a la segunda card memorizadoras
      gameMemory2.nameMemory = name;
      gameMemory2.id = id;

      valuePrev2 = evt.currentTarget;

      if (gameMemory.nameMemory === name && gameMemory.id !== gameMemory2.id) {
        asertion.push(true);
        gameMemory.nameMemory = null;
        gameMemory2.nameMemory = null;
        if (asertion.length === 8) {
          const $allCard = document.querySelectorAll('.memory__card');
          $allCard.forEach((card) => {
            card.classList.remove('memory__card');
          });
          setTimeout(() => {
            setGame({
              view: '1',
              result: 'Has ganado',
              gameOver: true,
            });
          }, 750);
        }

        return null;
      }

      gameMemory.id = id;

      setTimeout(() => {
        valuePrev.classList.remove('memory__card');
        valuePrev2.classList.remove('memory__card');
        gameMemory.nameMemory = null;
        gameMemory2.nameMemory = null;
      }, 750);

      return null;
    }
    // Le damos valores a la primera card memorizadoras
    gameMemory.id = id;
    valuePrev = evt.currentTarget;

    return (gameMemory.nameMemory = name);
  };

  const complete = () => {
    const $allCard = document.querySelectorAll('.memory__card');
    $allCard.forEach((card) => {
      card.classList.remove('memory__card');
    });
    if (asertion.length < 8) {
      setGame({
        view: '1',
        result: 'Has perdido',
        gameOver: true,
      });
    }
    setGame({
      view: '1',
      result: 'Has ganado',
      gameOver: true,
    });
  };
  const newGame = () => {
    setReset(!reset);
    return setGame({
      view: '',
      result: '',
      gameOver: false,
    });
  };
  function shuffle(array: pokemon[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const indexRadom = Math.floor(Math.random() * (i + 1));
      [array[i], array[indexRadom]] = [array[indexRadom], array[i]];
    }
  }
  shuffle(pokemos);
  return (
    <div className='memory'>
      <div className='memory__container'>
        {pokemos.map((pokemon, index) => (
          <div
            key={index}
            ref={divRef}
            className='memory__div'
            onClick={(evt) => handleClick(pokemon.name, index, evt)}
          >
            <img
              className='memory__img'
              src={pokemon.images}
              alt={pokemon.name}
            />
            <img className='memory__back' src='../assets/pokeball.png' alt='' />
          </div>
        ))}
      </div>
      <div className='memory__decrementador'>
        <Decrementador
          gameOver={game.gameOver}
          asertions={false}
          complete={complete}
          newGame={reset ? true : false}
        />
      </div>
      <ModalResult content={game.result} view={game.view} newGame={newGame} />
    </div>
  );
};

export default PuzzleMemory;
