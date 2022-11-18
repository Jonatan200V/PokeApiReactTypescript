import { pokeApiValues, pokemon } from '../types/types';
export const mapCardPokeApi = (apiResponse: pokeApiValues): pokemon[] => {
  const pokeApiResponse = Object.values({ apiResponse });
  return pokeApiResponse.map((pokeApiCard) => {
    const { name, id, stats, types, sprites, moves: movesApi } = pokeApiCard;
    const [
      hpObject,
      attackObject,
      defenseObject,
      specialAttackObject,
      specialDefenseObject,
      speedObject,
    ] = stats;
    const { base_stat: base_statHp, stat: statHp } = hpObject;
    const { base_stat: base_statAtk, stat: statAtk } = attackObject;
    const { base_stat: base_statDef, stat: statDef } = defenseObject;
    const { base_stat: base_statEAtk, stat: statEAtk } = specialAttackObject;
    const { base_stat: base_statEDef, stat: statEDef } = specialDefenseObject;
    const { base_stat: base_statSpeed, stat: statSpeed } = speedObject;
    const { other } = sprites;
    const { front_default } = other['official-artwork'];
    const hp = {
      name: statHp.name,
      stat: base_statHp,
    };
    const atk = {
      name: statAtk.name,
      stat: base_statAtk,
    };
    const defense = {
      name: statDef.name,
      stat: base_statDef,
    };
    const specialAttack = {
      name: statEAtk.name,
      stat: base_statEAtk,
    };
    const specialDefense = {
      name: statEDef.name,
      stat: base_statEDef,
    };
    const speed = {
      name: statSpeed.name,
      stat: base_statSpeed,
    };

    const typesAll = types.map((type) => type.type.name);
    const moves = movesApi.map((move) => move.move.name);
    return {
      name,
      id,
      hp,
      atk,
      defense,
      specialAttack,
      specialDefense,
      speed,
      typesAll,
      images: front_default,
      moves: moves,
    };
  });
};
