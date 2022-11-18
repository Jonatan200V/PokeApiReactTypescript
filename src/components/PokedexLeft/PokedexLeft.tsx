import React, { useState } from 'react';
import { pokemon } from '../../types/types';
import Button from '../Button/Button';
interface PokedexLeftProps {
  pokemon: pokemon;
}
type FeaturesPoke =
  | 'atk'
  | 'defense'
  | 'hp'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'
  | 'typesAll'
  | 'moves';
interface PokedexLeftState {
  features: FeaturesPoke;
}
const PokedexLeft = ({ pokemon }: PokedexLeftProps) => {
  const [view, setView] = useState<PokedexLeftState['features']>('atk');

  const handleClickFeaturesPokemon = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const { name } = evt.currentTarget;
    switch (name) {
      case 'atk':
        return setView(name);
      case 'defense':
        return setView(name);
      case 'hp':
        return setView(name);
      case 'specialAttack':
        return setView(name);
      case 'specialDefense':
        return setView(name);
      case 'speed':
        return setView(name);
      case 'typesAll':
        return setView(name);
      case 'moves':
        return setView(name);
      default:
        return;
    }
  };
  const handleClickNextPrev = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const { name } = evt.currentTarget;
    const features: FeaturesPoke[] = [
      'atk',
      'defense',
      'specialAttack',
      'specialDefense',
      'speed',
      'hp',
      'typesAll',
      'moves',
    ];
    if (name === 'next') {
      return features.forEach((feature, i) => {
        if (view === feature && features.length > i + 1) {
          setView(features[i + 1]);
        }
      });
    }
    return features.forEach((feature, i) => {
      if (view === feature && 0 <= i - 1) {
        setView(features[i - 1]);
      }
    });
  };
  return (
    <div className='pokemon__right'>
      <div className='pokemon__pokedexr'>
        <div className='pokemon__border'>
          <div className='pokemon__border-container'>
            <div className='pokemon__topr'>
              <div className='pokemon__results'>
                <>
                  {view === 'moves' ? (
                    <div className='pokemon__moves'>
                      {pokemon[view].slice(0, 5).map((move) => (
                        <div>
                          {move.replace(move[0], move[0].toUpperCase())}
                        </div>
                      ))}
                    </div>
                  ) : view === 'typesAll' ? (
                    <div className='pokemon__div-types'>
                      {pokemon[view].map((image) => (
                        <div className='pokemon__types'>
                          <img
                            className='pokemon__image'
                            src={`../assets/Types/${image}.png`}
                            alt=''
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <span className='pokemon__spanr'>
                        {pokemon[view].name.replace(
                          pokemon[view].name[0],
                          pokemon[view].name[0].toUpperCase()
                        )}
                      </span>
                      <span className='pokemon__spanr'>
                        : {pokemon[view].stat}
                      </span>
                    </div>
                  )}
                </>
              </div>
              <div className='pokemon__buttons'>
                <Button
                  name='atk'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='defense'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='specialAttack'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='specialDefense'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='speed'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='hp'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='typesAll'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='moves'
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__buton'
                />
                <Button
                  name='next'
                  handleClick={handleClickNextPrev}
                  classN='pokemon__buton'
                />
                <Button
                  name='prev'
                  handleClick={handleClickNextPrev}
                  classN='pokemon__buton'
                />
              </div>
            </div>
            <div className='pokemon__bottomr'>
              <div className='pokemon__bottomr-ray'>
                <Button
                  name=''
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__bottomr-ray-button'
                />
                <Button
                  name=''
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__bottomr-ray-button'
                />
              </div>
              <div className='pokemon__bottomr-three'>
                <div className='pokemon__bottomr-div'>
                  <Button
                    name=''
                    handleClick={handleClickFeaturesPokemon}
                    classN='pokemon__bottomr-three-buttonl'
                  />
                  <Button
                    name=''
                    handleClick={handleClickFeaturesPokemon}
                    classN='pokemon__bottomr-three-buttonl'
                  />
                </div>
                <Button
                  name=''
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__bottomr-three-buttonr'
                />
              </div>
              <div className='pokemon__bottomr-end'>
                <Button
                  name=''
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__bottomr-end-button'
                />
                <Button
                  name=''
                  handleClick={handleClickFeaturesPokemon}
                  classN='pokemon__bottomr-end-button'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexLeft;
