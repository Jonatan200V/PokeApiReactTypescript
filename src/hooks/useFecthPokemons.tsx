import { useEffect, useState } from 'react';
import { nameUrl, pokeAllValues, pokeApiValues } from '../types/types';
import { mapCardPokeApi } from '../utils/fetchToMap';
import { useAppContext } from './useAppContext';
interface AppState {
  loading: boolean;
}
const useFecthPokemons = () => {
  const [loading, setLoading] = useState<AppState['loading']>(false);
  const { allPokemon, addPokemon } = useAppContext();
  useEffect(() => {
    const getApiPokemon = (): Promise<pokeAllValues> => {
      return fetch('https://pokeapi.co/api/v2/pokemon?limit=100').then(
        (res) => {
          return res.json() as Promise<pokeAllValues>;
        }
      );
    };
    getApiPokemon().then((res) => {
      res.results.forEach((response: nameUrl) => {
        fetch(response.url)
          .then((res) => res.json())
          .then((data: pokeApiValues) => {
            const responseApi = mapCardPokeApi(data);
            addPokemon(responseApi);

            setLoading(true);
          })
          .catch((err) => console.log(err));
      });
    });
  }, []);

  return { allPokemon, loading };
};

export default useFecthPokemons;
