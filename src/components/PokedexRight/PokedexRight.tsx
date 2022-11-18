import React from 'react';
import { nextPrev, pokemon } from '../../types/types';
import {
  arrowBottom,
  arrowLeft,
  arrowRight,
  arrowTop,
} from '../../utils/icons/icons';
interface PokedexRightProps {
  pokemon: pokemon;
  onClickChangePokemon: (id: number, name: nextPrev) => void;
}
const PokedexRight = ({ pokemon, onClickChangePokemon }: PokedexRightProps) => {
  return (
    <div className='pokemon__left'>
      <div className='pokemon__pokedexl'>
        <div className='pokemon__pokedexl-left'>
          <div className='pokemon__pokedexl-contain-div-button'>
            <div className='pokemon__pokedexl-contain-button'>
              <button className='pokemon__pokedexl-button'></button>
            </div>
          </div>
          <div className='pokemon__pokedexl-background'>
            <div className='pokemon__pokedexl-backgroundfalse'>
              <div className='pokemon__pokedexl-container'>
                <div className='pokemon__pokedexl-container-top'>
                  <div className='pokemon__pokedexl-container-top-buttons-red'>
                    <div className='pokemon__pokedexl-container-top-red'></div>
                    <div className='pokemon__pokedexl-container-top-red'></div>
                  </div>
                  <div className='pokemon__pokedexl-container-top-div'>
                    <h2 className='pokemon__pokedexl-container-top-h2'>
                      Hello{' '}
                      {pokemon.name.replace(
                        pokemon.name[0],
                        pokemon.name[0].toUpperCase()
                      )}
                      !
                    </h2>
                    <img
                      className='pokemon__pokedexl-container-top-img'
                      src={pokemon.images}
                      alt={pokemon.name}
                      loading='lazy'
                    />
                  </div>
                  <div className='pokemon__pokedexl-container-top--container'>
                    <button className='pokemon__pokedexl-container-top--div'></button>
                    <div className='pokemon__pokedexl-container-top--bot'>
                      <div className='pokemon__pokedexl-container-top--line'></div>
                      <div className='pokemon__pokedexl-container-top--line'></div>
                      <div className='pokemon__pokedexl-container-top--line'></div>
                    </div>
                  </div>
                </div>
                <div className='pokemon__pokedexl-container-bottom'>
                  <div className='pokemon__pokedexl-container-bottom-container'>
                    <div className='pokemon__pokedexl-container-bottom-top'>
                      <button className='pokemon__pokedexl-container-bottom-circle'></button>
                      <button className='pokemon__pokedexl-container-bottom-button'></button>
                      <button className='pokemon__pokedexl-container-bottom-button'></button>
                    </div>
                    <div className='pokemon__pokedexl-container-bottom-bottom'>
                      <button className='pokemon__pokedexl-container-bottom-rect'></button>
                    </div>
                  </div>
                  <div className='pokemon__pokedexl-container-bottom-jostick'>
                    <div
                      onClick={() => onClickChangePokemon(pokemon.id, 'next')}
                      className='pokemon__pokedexl-container-bottom-div'
                    >
                      {arrowTop}
                    </div>
                    <div className='pokemon__pokedexl-container-bottom--container'>
                      <div
                        onClick={() => onClickChangePokemon(pokemon.id, 'prev')}
                        className='pokemon__pokedexl-container-bottom-div'
                      >
                        {arrowLeft}
                      </div>
                      <div
                        onClick={() => onClickChangePokemon(pokemon.id, 'next')}
                        className='pokemon__pokedexl-container-bottom-div'
                      >
                        {arrowRight}
                      </div>
                    </div>
                    <div
                      onClick={() => onClickChangePokemon(pokemon.id, 'prev')}
                      className='pokemon__pokedexl-container-bottom-div'
                    >
                      {arrowBottom}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pokemon__pokedexl-linear'>
          <div className='pokemon__pokedexl-linear-orange'></div>
          <div className='pokemon__pokedexl-linear-purpura'></div>
        </div>
      </div>
    </div>
  );
};

export default PokedexRight;
