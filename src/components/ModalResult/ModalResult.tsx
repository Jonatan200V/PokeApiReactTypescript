import React from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';
interface ModalResultProps {
  content: string;
  view: boolean;
  newGame: () => void;
  pokemonPuzzle: () => void;
}
const ModalResult = ({
  content,
  view = false,
  newGame,
  pokemonPuzzle,
}: ModalResultProps) => {
  const div = document.getElementById('div') as HTMLDivElement;
  const navigate = useNavigate();
  const handleClick = (game: boolean) => {
    if (game) {
      pokemonPuzzle();
      return newGame();
    }
    navigate('/');
  };
  return ReactDom.createPortal(
    <div
      className='portal'
      style={{
        visibility: `${view ? 'visible' : 'hidden'}`,
        transform: `${view ? 'scale(1)' : 'scale(0)'}`,
      }}
    >
      <div className='portal__div'>
        <div
          className='portal__modal'
          style={{
            color: `${view ? 'green' : 'red'}`,
          }}
        >
          {content}
        </div>
        <div className='portal__info'>¿Quieres volver a jugar?</div>
        <div>
          <button className='portal__button' onClick={() => handleClick(true)}>
            Si
          </button>
          <button className='portal__button' onClick={() => handleClick(false)}>
            No
          </button>
        </div>
      </div>
    </div>,
    div
  );
};
export default ModalResult;
