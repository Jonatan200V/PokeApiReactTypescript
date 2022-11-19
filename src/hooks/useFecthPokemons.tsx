import { useEffect, useState } from 'react';
import { pokeAllValues, pokeApiValues } from '../types/types';
import { mapCardPokeApi } from '../utils/fetchToMap';
import { useAppContext } from './useAppContext';
interface AppState {
  loading: boolean;
}
let i: number = 0;
const useFecthPokemons = () => {
  const [loading, setLoading] = useState<AppState['loading']>(false);
  const { allPokemon, addPokemon } = useAppContext();
  useEffect(() => {
    if (allPokemon.length === 0) {
      const getApiPokemon = (): Promise<pokeAllValues> => {
        return fetch('https://pokeapi.co/api/v2/pokemon?limit=100').then(
          (res) => {
            return res.json() as Promise<pokeAllValues>;
          }
        );
      };
      if (i === 0) {
        i = 1;
        getApiPokemon().then((res) => {
          res.results.forEach((response) => {
            fetch(response.url)
              .then((res) => res.json())
              .then((data: pokeApiValues) => {
                const responseApi = mapCardPokeApi(data);
                addPokemon(responseApi);
              })
              .catch((err) => console.log(err));
          });
          setLoading(true);
        });
      }
    }
  }, [addPokemon]);

  return { allPokemon, loading };
};

export default useFecthPokemons;
