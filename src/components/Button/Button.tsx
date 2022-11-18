import React from 'react';
interface ButtonProps {
  classN: string;
  name: string;
  handleClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ classN, handleClick, name }: ButtonProps) => {
  return (
    <button name={name} onClick={handleClick} className={classN}>
      {name.slice(0, 3).toUpperCase()}
    </button>
  );
};

export default Button;
