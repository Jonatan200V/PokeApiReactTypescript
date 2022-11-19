import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
interface FiltersProps {
  value: number;
  value2: number;
}
const Filters = ({ value, value2 }: FiltersProps) => {
  const { types, filterTypes } = useAppContext();

  const handleClick = (type: string) => {
    filterTypes(type);
  };

  return (
    <div className='filter'>
      {types.slice(value, value2).map((type) => (
        <img
          key={type}
          onClick={() => handleClick(type)}
          className='filter__img'
          src={`../assets/Types/${type}.png`}
          alt={type}
        />
      ))}
    </div>
  );
};

export default Filters;
