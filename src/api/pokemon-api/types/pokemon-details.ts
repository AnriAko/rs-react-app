export type PokemonDetails = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: Ability[];
  sprites: Sprites;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type Sprites = {
  front_default: string;
  other?: {
    ['official-artwork']?: {
      front_default?: string;
    };
  };
};
