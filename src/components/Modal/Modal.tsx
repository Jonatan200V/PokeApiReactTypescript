import React from 'react';
import { pokemon } from '../../types/types';
import PokedexLeft from '../PokedexLeft/PokedexLeft';
import PokedexRight from '../PokedexRight/PokedexRight';
interface ModalProps {
  cardModal: pokemon[];
}
const Modal = ({ cardModal }: ModalProps) => {
  return (
    <div className='pokemon'>
      {cardModal.map((pokemon) => (
        <div className='pokemon__map'>
          <PokedexRight pokemon={pokemon} />
          <PokedexLeft pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Modal;
