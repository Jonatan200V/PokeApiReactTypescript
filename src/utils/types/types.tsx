import About from '../../components/About/About';
import Info from '../../components/Info/Info';
import Types from '../../components/Types/Types';
import { helpers } from '../../types/types';

export const isNumber = (id: number | boolean): boolean => {
  if (typeof id === 'number') {
    return true;
  }
  return false;
};
export const helper: helpers[] = [
  { name: 'Types', id: 1, component: <Types /> },
  { name: 'Info', id: 2, component: <Info /> },
  { name: 'About', id: 3, component: <About /> },
];
