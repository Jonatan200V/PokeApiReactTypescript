import { useEffect, useReducer } from 'react';
import Decrementador from '../components/Decrementador/Decrem/Decrementador';
import ModalResult from '../components/ModalResult/ModalResult';
import { useAppContext } from '../hooks/useAppContext';
import {
  INITIAL_STATE,
  reducerPuzzleMemory,
} from '../utils/reducers/puzzleMemoryReducer';

const PuzzleMemory = () => {
  const [state, dispatch] = useReducer(reducerPuzzleMemory, INITIAL_STATE);
  const { pokemonsMemory, memoryPoke } = useAppContext();

  useEffect(() => {
    pokemonsMemory();
  }, []);

  useEffect(() => {
    if (state.cacheMemory.length === 2) {
      const timeId = setTimeout(() => {
        dispatch({ type: '@memory/hit' });
      }, 750);
      return () => clearInterval(timeId);
    }
  }, [state.cacheMemory]);

  useEffect(() => {
    if (state.memoryHit.length === 16) {
      return dispatch({
        type: '@memory/gameover',
        payload: {
          gameOver: true,
          result: 'Has ganado',
          view: true,
        },
      });
    }
  }, [state.memoryHit]);
  const handleClick = (name: string, id: number) => {
    if (state.cacheMemory.length <= 1) {
      dispatch({
        type: '@memory/cache',
        payload: {
          name,
          id,
        },
      });
    }
  };

  const gameOver = () => {
    dispatch({
      type: '@memory/gameover',
      payload: {
        gameOver: true,
        result: 'Has perdido',
        view: true,
      },
    });
  };
  const newGame = () => {
    return dispatch({
      type: '@memory/newgame',
    });
  };
  return (
    <div className='memory'>
      <div className='memory__container'>
        {memoryPoke.map((pokemon, index) => (
          <div
            key={index}
            className={`memory__div  ${
              state.memoryHit.includes(index) || state.cacheHit.includes(index)
                ? 'memory__card'
                : ''
            }`}
            onClick={() => handleClick(pokemon.name, index)}
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
          gameOver={state.newGame.gameOver}
          asertions={false}
          complete={gameOver}
          newGame={state.reset}
        />
      </div>
      <ModalResult
        pokemonPuzzle={pokemonsMemory}
        content={state.newGame.result}
        view={state.newGame.view}
        newGame={newGame}
      />
    </div>
  );
};

export default PuzzleMemory;
