import { useRef, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { nextPrev, pokemon } from '../../types/types';
import { close } from '../../utils/icons/icons';
// import { isNumber } from '../../utils/types/types';
// import Header from '../Header/Header';
import Modal from '../Modal/Modal';
interface CardProps {
  allPokemon: pokemon[];
}
interface CardState {
  modal: boolean;
  cardPokemon: pokemon[];
  scrollY: number;
}
const Card = ({ allPokemon }: CardProps) => {
  // const [modal, setModal] = useState<CardState['modal']>(false);
  // const [cardModal, setCardModal] = useState<CardState['cardPokemon']>([]);
  const [marginTopY, setMarginTopY] = useState<CardState['scrollY']>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const { handleClikcOpenModal, modal, cardModal } = useAppContext();
  // const handleClikcOpenModal = (id: number | boolean): void => {
  //   const isItNumber = isNumber(id);
  //   if (isItNumber) {
  //     const pokemonModalCard = allPokemon.findIndex(
  //       (pokemon) => pokemon.id === id
  //     );
  //     setCardModal([allPokemon[pokemonModalCard]]);
  //     setModal(!modal);
  //   } else {
  //     divRef.current?.classList.add('card__modal-close');
  //     setCardModal([]);
  //     setTimeout(() => {
  //       divRef.current?.classList.remove('card__modal-close');
  //       setModal(!modal);
  //     }, 400);
  //   }
  // };
  const onClickChangePokemon = (id: number, name: nextPrev): void => {
    const pokemonModalCard = allPokemon.findIndex(
      (pokemon) => pokemon.id === id
    );
    if (name === 'next') {
      // return setCardModal([allPokemon[pokemonModalCard + 1]]);
    }
    // return setCardModal([allPokemon[pokemonModalCard - 1]]);
  };
  window.addEventListener('scroll', () => {
    setMarginTopY(window.pageYOffset);
  });

  return (
    <>
      {/* <Header handleClikcOpenModal={handleClikcOpenModal} /> */}
      <section className='card'>
        {allPokemon.map((pokemon) => (
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
          <div
            style={{ marginTop: `${marginTopY}px` }}
            className='card__modal'
            ref={divRef}
          >
            <div className='card__close'>
              <div
                className='card__button'
                onClick={() => handleClikcOpenModal(false, divRef.current)}
              >
                {close}
              </div>
            </div>
            <Modal
              cardModal={cardModal}
              onClickChangePokemon={onClickChangePokemon}
            />
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Card;
