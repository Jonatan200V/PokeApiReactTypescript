import { pokemon } from '../types/types';

export function shuffle(array: pokemon[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const indexRadom = Math.floor(Math.random() * (i + 1));
    [array[i], array[indexRadom]] = [array[indexRadom], array[i]];
  }
  return array;
}
