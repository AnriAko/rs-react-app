export type NamedApiResource = {
  name: string;
  url: string;
};

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
  type: NamedApiResource;
};

export type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
};

export type Sprites = {
  front_default: string;
  other?: {
    ['official-artwork']?: {
      front_default?: string;
    };
  };
};
