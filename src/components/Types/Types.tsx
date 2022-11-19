import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const Types = () => {
  const { types } = useAppContext();
  return (
    <div className='type'>
      <div className='types'>
        <div className='types__div'>
          {types.slice(0, 8).map((type) => (
            <div key={type} className='types__map'>
              <span className='types__span'>{type}</span>
              <img
                className='types__img'
                src={`../assets/Types/${type}.png`}
                alt={type}
              />
            </div>
          ))}
        </div>

        <div className='types__div'>
          {types.slice(8, 16).map((type) => (
            <div key={type} className='types__map'>
              <span className='types__span'>{type}</span>
              <img
                className='types__img'
                src={`../assets/Types/${type}.png`}
                alt={type}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Types;
