import { useEffect, useState } from 'react';

interface DecrementadorState {
  counter: number;
}
interface Hits {
  game: string;
  asertion: number;
  errors: number;
}
interface DecrementadorProps {
  asertions: Hits | false;
  complete: (time: number) => void;
  gameOver: boolean;
  newGame: boolean;
}
const min: number = 60;
const Decrementador = ({
  asertions,
  complete,
  newGame,
  gameOver,
}: DecrementadorProps) => {
  const [count, setCount] = useState<DecrementadorState['counter']>(min);
  useEffect(() => {
    if (count === 0) {
      complete(count);
    }
    if (!gameOver && count > 0) {
      const timeId = setTimeout(
        () => setCount((oldCount) => oldCount - 1),
        1000
      );
      return () => clearInterval(timeId);
    }
    console.log({ newGame });
  }, [count, newGame, gameOver]);
  useEffect(() => {
    setCount(min);
  }, [newGame, gameOver]);
  return (
    <div className='decrementador'>
      <div className='decrementador__count'>{count}</div>
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
