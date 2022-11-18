import React from 'react';
import { nextPrev, pokemon } from '../../types/types';
import PokedexLeft from '../PokedexLeft/PokedexLeft';
import PokedexRight from '../PokedexRight/PokedexRight';
interface ModalProps {
  cardModal: pokemon[];
  onClickChangePokemon: (id: number, name: nextPrev) => void;
}
const Modal = ({ cardModal, onClickChangePokemon }: ModalProps) => {
  return (
    <div className='pokemon'>
      {cardModal.map((pokemon) => (
        <div className='pokemon__map'>
          <PokedexRight
            pokemon={pokemon}
            onClickChangePokemon={onClickChangePokemon}
          />
          <PokedexLeft pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Modal;
