import { useEffect, useRef } from 'react';
import { close } from '../../utils/icons/icons';
import { helper } from '../../utils/types/types';

interface SettingsProps {
  selected: number;
  openModal: boolean;
  changeModalZero: (id: number) => void;
}

const Settings = ({ selected, openModal, changeModalZero }: SettingsProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected !== 0) {
      divRef.current?.classList.remove('setting__close--modal');
    }
  }, [selected]);
  useEffect(() => {
    if (openModal === false) {
      divRef.current?.classList.add('setting__close--modal');
    }
  }, [openModal]);
  const handleClick = (): void => {
    divRef.current?.classList.add('setting__close--modal');
    changeModalZero(0);
  };
  const viewOption = helper.filter((help) => help.id === selected);
  return (
    <div ref={divRef} className='setting'>
      <button onClick={handleClick} className='setting__button'>
        {close}
      </button>
      {viewOption.map((component) => (
        <div key={component.name}>{component.component}</div>
      ))}
    </div>
  );
};

export default Settings;
