import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { puzzle, question } from '../../utils/icons/icons';
import { helper } from '../../utils/types/types';
// import { helper } from '../../utils/types/types';
// import { helper } from '../../types/types';

import Settings from '../Settings/Settings';
interface HelpState {
  selected: number;
  open: boolean;
}

const Help = () => {
  const helpRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<HelpState['selected']>(0);
  const [openModal, setOpenModal] = useState<HelpState['open']>(false);

  const handleClick = (): void => {
    if (helpRef.current?.classList.contains('help__view')) {
      helpRef.current?.classList.toggle('help__view');
      windowRef.current?.classList.toggle('help__view--window');
      setSelected(0);
      return setOpenModal(false);
    }
    helpRef.current?.classList.toggle('help__view');
    windowRef.current?.classList.toggle('help__view--window');
    setOpenModal(true);
  };
  const handleChangeModalHelp = (id: number): void => {
    setSelected(id);
  };
  const changeModalZero = (id: number): void => {
    setSelected(id);
  };
  //TODO SUGRENECIA PONERLE UNA IMAGEN AL LADO DE CADA LI
  return (
    <div className='app'>
      <div className='help' ref={helpRef}>
        <div className='help__helper'>
          <button className='help__open' title='Help' onClick={handleClick}>
            <img className='help__img' src='../assets/pokeball.png' alt='' />
          </button>
        </div>
        <div ref={windowRef} className='help__window'>
          <ul className='help__ul'>
            <Link title='Puzzle' className='help__link ' to={`/puzzle-guess`}>
              Guess {puzzle}
            </Link>
            <Link title='Puzzle' className='help__link ' to={`/puzzle-memory`}>
              Memory {puzzle}
            </Link>
            {helper.map((help) => (
              <li
                title='Help'
                onClick={() => handleChangeModalHelp(help.id)}
                className='help__li '
                key={help.id}
              >
                {help.name}
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Settings
        selected={selected}
        changeModalZero={changeModalZero}
        openModal={openModal}
      />
    </div>
  );
};

export default Help;
