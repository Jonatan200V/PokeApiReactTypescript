import React from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';
interface ModalResultProps {
  content: string;
  view: string;
  newGame: () => void;
}
const ModalResult = ({ content, view = '', newGame }: ModalResultProps) => {
  const div = document.getElementById('div') as HTMLDivElement;
  const navigate = useNavigate();
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = evt.currentTarget;
    if (name === 'yes') {
      return newGame();
    }
    navigate('/');
  };
  return ReactDom.createPortal(
    <div
      className='portal'
      style={{
        visibility: `${view === '' ? 'hidden' : 'visible'}`,
        transform: `${view === '' ? 'scale(0)' : 'scale(1)'}`,
      }}
    >
      <div className='portal__div'>
        <div
          className='portal__modal'
          style={{
            color: `${view === 'Has perdido' ? 'red' : 'green'}`,
          }}
        >
          {content}
        </div>
        <div className='portal__info'>¿Do you want to play again?</div>
        <div>
          <button className='portal__button' name='yes' onClick={handleClick}>
            Yes
          </button>
          <button className='portal__button' name='no' onClick={handleClick}>
            No
          </button>
        </div>
      </div>
    </div>,
    div
  );
};
export default ModalResult;
