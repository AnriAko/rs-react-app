interface PokemonProps {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url }: PokemonProps) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="bg-gray-800 text-white rounded-md p-4 shadow-md hover:shadow-lg transition">
      <div className="mb-2 font-semibold">Pokémon: {capitalized}</div>
      <div>
        Description:{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {url}
        </a>
      </div>
    </div>
  );
};

export default PokemonCard;
