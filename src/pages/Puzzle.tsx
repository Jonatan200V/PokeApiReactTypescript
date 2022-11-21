import { useState } from 'react';
import Decrementador from '../components/Decrementador/Decrem/Decrementador';
import ModalResult from '../components/ModalResult/ModalResult';
import PokeOptions from '../components/PokeOptions/PokeOptions';
import { useAppContext } from '../hooks/useAppContext';
import { pokemon } from '../types/types';
interface PuzzleState {
  allSwitch: boolean;
  countSet: number;
  asertions: {
    game: string;
    view: string;
    asertion: number;
    errors: number;
    gameOver: boolean;
  };
}
const Puzzle = () => {
  const { allPokemon } = useAppContext();
  const [allSwitch, setAllSwitch] = useState<PuzzleState['allSwitch']>(false);
  const [asertions, setAsertions] = useState<PuzzleState['asertions']>({
    game: '',
    asertion: 0,
    errors: 0,
    view: '',
    gameOver: false,
  });
  const [game, setGame] = useState<PuzzleState['allSwitch']>(false);
  const poke = allPokemon[Math.floor(Math.random() * allPokemon.length)];
  let pokeOption: pokemon[] = [];

  while (pokeOption.length < 3) {
    const azarPokemon =
      allPokemon[Math.floor(Math.random() * allPokemon.length)];
    const existsPokemon = pokeOption.find(
      (poke) => poke.name === azarPokemon.name
    );
    if (!existsPokemon) {
      pokeOption.push(
        allPokemon[Math.floor(Math.random() * allPokemon.length)]
      );
    }
  }
  const handleClick = (name: string) => {
    if (poke.name === name) {
      setAsertions({
        ...asertions,
        asertion: asertions.asertion + 1,
      });
      if (asertions.asertion + 1 === 10) {
        return setAsertions({
          ...asertions,
          game: 'Has Ganado',
          view: '1',
          gameOver: true,
        });
      }
      return setAllSwitch(!allSwitch);
    }
    setAsertions({
      ...asertions,
      errors: asertions.errors + 1,
    });
    setAllSwitch(!allSwitch);
    if (asertions.errors + 1 === 3) {
      return setAsertions({
        ...asertions,
        game: 'Has perdido',
        view: '1',
      });
    }
  };
  const newGame = () => {
    setGame(!game);
    return setAsertions({
      ...asertions,
      game: '',
      asertion: 0,
      errors: 0,
      view: '',
      gameOver: false,
    });
  };
  const complete = (state: number) => {
    return setAsertions({
      ...asertions,
      game: 'Has perdido',
      view: '1',
      gameOver: true,
    });
  };
  return (
    <div className='puzzle'>
      <div className=''>
        <ModalResult
          content={asertions.game}
          view={asertions.view}
          newGame={newGame}
        />
        {[poke].map((pokemon) => (
          <div key={pokemon.id} className='puzzle__map'>
            <img
              className='puzzle__img'
              src={pokemon.images}
              alt=''
              loading='lazy'
            />
          </div>
        ))}
        <ul className='puzzle__ul'>
          <PokeOptions
            pokeOption={pokeOption}
            poke={poke}
            handleClick={handleClick}
          />
        </ul>
      </div>
      <Decrementador
        gameOver={asertions.gameOver}
        asertions={asertions}
        complete={complete}
        newGame={game}
      />
    </div>
  );
};

export default Puzzle;
