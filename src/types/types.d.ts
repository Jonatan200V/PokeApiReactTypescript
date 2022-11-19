type nameUrl = {
  name: string;
  url: string;
};
type featuresValue = {
  name: string;
  stat: number;
};
export type nextPrev = 'next' | 'prev';
export interface pokeApiValues {
  name: string;
  abilities: Array<{
    ability: nameUrl;
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  forms: Array<nameUrl>;
  game_indices: Array<{
    game_index: number;
    version: nameUrl;
  }>;
  height: number;
  held_items: Array<{
    item: nameUrl;
    version_details: Object[{
      rarity: number;
      version: nameUrl;
    }];
  }>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{
    move: nameUrl;
    version_group_details: Object[{
      level_learned_at: number;
      move_learn_method: nameUrl;
      version_group: nameUrl;
    }];
  }>;
  order: number;
  past_types: [];
  species: nameUrl;
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
      };
      'official-artwork': {
        front_default: string;
      };
    };
    versions: Object;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: nameUrl;
  }>;
  types: Array<{
    slot: number;
    type: nameUrl;
  }>;
  weight: number;
}
export interface pokeAllValues {
  count: number;
  next: string;
  previous: null | string;
  results: Array<nameUrl>;
}
export interface pokemon {
  name: string;
  id: number;
  hp: featuresValue;
  atk: featuresValue;
  defense: featuresValue;
  specialAttack: featuresValue;
  specialDefense: featuresValue;
  speed: featuresValue;
  typesAll: string[];
  images: string;
  moves: string[];
}

export interface helpers {
  id: number;
  name: string;
  component: any;
}
