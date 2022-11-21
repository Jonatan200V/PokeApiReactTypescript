import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { pokemon } from '../../types/types';
import { close } from '../../utils/icons/icons';
import Modal from '../Modal/Modal';
interface CardProps {
  allPokemon: pokemon[];
}
//TODO HACER UN STATE DE CARGA
interface CardState {
  paginated: {
    value1: number;
    value2: number;
  };
  buttons: number[];
  selected: number;
}
const Card = ({ allPokemon }: CardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [paginated, setPaginated] = useState<CardState['paginated']>({
    value1: 0,
    value2: 16,
  });
  const [buttons, setButtons] = useState<CardState['buttons']>([]);
  const [selected, setSelected] = useState<CardState['selected']>(0);
  const button = Math.ceil(allPokemon.length / 16);
  useEffect(() => {
    setPaginated({
      ...paginated,
      value1: 0,
      value2: 16,
    });
    setSelected(0);
  }, [allPokemon.length]);
  useEffect(() => {
    let buttonArray: number[] = [];
    for (let index = 1; index <= button; index++) {
      buttonArray.push(index);
    }
    setButtons(buttonArray);
  }, [button]);
  const { handleClikcOpenModal, modal, cardModal } = useAppContext();
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = evt.currentTarget;
    if (name === 'next') {
      setPaginated({
        ...paginated,
        value1:
          paginated.value1 >= allPokemon.length - 16
            ? paginated.value1
            : paginated.value1 + 16,
        value2:
          paginated.value2 >= allPokemon.length
            ? paginated.value2
            : paginated.value2 + 16,
      });
      return setSelected(
        selected === buttons[buttons.length - 2]
          ? buttons[buttons.length - 2]
          : selected + 1
      );
    }
    setPaginated({
      ...paginated,
      value1:
        paginated.value1 <= 0 ? (paginated.value1 = 0) : paginated.value1 - 16,
      value2:
        paginated.value2 <= 16
          ? (paginated.value2 = 16)
          : paginated.value2 - 16,
    });
    return setSelected(selected === 0 ? 0 : selected - 1);
  };
  const handleClickButtons = (
    evt: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const { id } = evt.currentTarget;
    buttons.forEach(() => {
      setPaginated({
        ...paginated,
        value1:
          Number(id) === 1 ? (paginated.value1 = 0) : 16 * (Number(id) - 1),
        value2: 16 * Number(id),
      });
    });
    setSelected(index);
  };
  return (
    <>
      <section className='card'>
        {allPokemon.slice(paginated.value1, paginated.value2).map((pokemon) => (
          <article className='card__map' key={pokemon.id}>
            <div className='card__top'>
              <h2 className='card__h2'>
                {pokemon.name.replace(
                  pokemon.name[0],
                  pokemon.name[0].toUpperCase()
                )}
              </h2>
              <img
                onClick={() => handleClikcOpenModal(pokemon.id, divRef.current)}
                className='card__img'
                src={pokemon.images}
                alt={pokemon.name}
                loading='lazy'
              />
            </div>
            <div className='card__bottom'>
              <div className='card__types'>
                <div className='card__div-type'>
                  {pokemon.typesAll.map((type) => (
                    <div key={type} className='card__type'>
                      <img
                        className='card__img-type'
                        src={`../assets/types/${type}.png`}
                        alt={type}
                        loading='lazy'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
        {modal ? (
          <div className='card__modal' ref={divRef}>
            <div className='card__close'>
              <div
                className='card__button'
                onClick={() => handleClikcOpenModal(false, divRef.current)}
              >
                {close}
              </div>
            </div>
            <Modal cardModal={cardModal} />
          </div>
        ) : null}
      </section>
      <div className='buttons'>
        <button name='prev' onClick={handleClick} className='buttons__button'>
          <span>{'<'}</span>
        </button>
        {buttons.map((button, index) => (
          <button
            id={`${button}`}
            className={`${
              selected === index ? 'buttons__select' : ''
            } buttons__index`}
            onClick={(evt) => handleClickButtons(evt, index)}
            key={button}
          >
            {button}
          </button>
        ))}
        <button name='next' onClick={handleClick} className='buttons__button'>
          <span>{'>'}</span>
        </button>
      </div>
    </>
  );
};

export default Card;
