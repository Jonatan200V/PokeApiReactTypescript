import { useEffect, useState } from 'react';

interface DecrementadorState {
  counter: number;
}
interface DecrementadorProps {
  asertions:
    | {
        game: string;
        asertion: number;
        errors: number;
      }
    | false;
  complete: (time: number) => void;
  gameOver: boolean;
  newGame: boolean;
}
const Decrementador = ({
  asertions,
  complete,
  newGame,
  gameOver,
}: DecrementadorProps) => {
  const [count, setCount] = useState<DecrementadorState['counter']>(61);
  useEffect(() => {
    if (count === 0) {
      complete(count);
    }
    if (!gameOver && count > 0) {
      setTimeout(() => setCount((oldCount) => oldCount - 1), 1000);
    }
  }, [count]);
  useEffect(() => {
    setCount(61);
  }, [newGame]);
  return (
    <div className='decrementador'>
      <div className='decrementador__count'>
        {count < 0 ? 0 : count === 61 ? 60 : count}
      </div>
      {asertions === false ? (
        ''
      ) : (
        <div className='decrementador__asertions'>
          {asertions.asertion} / 10
          <div>{asertions.errors} / 3</div>
        </div>
      )}
    </div>
  );
};

export default Decrementador;
