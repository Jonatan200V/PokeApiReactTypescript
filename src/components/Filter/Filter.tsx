import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const Filter = () => {
  const { typesFilters } = useAppContext();
  return (
    <div className='filt'>
      {typesFilters.map((type) => (
        <img
          key={type}
          className='filt__img'
          src={`../assets/Types/${type}.png`}
          alt={type}
          loading='lazy'
        />
      ))}
    </div>
  );
};

export default Filter;
