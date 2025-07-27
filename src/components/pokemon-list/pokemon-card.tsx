interface Props {
  name: string;
  url: string;
  onSelect: (url: string) => void;
}

const PokemonCard = ({ name, url, onSelect }: Props) => {
  return (
    <div
      onClick={() => onSelect(url)}
      className="bg-gray-800 text-white rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition max-h-15"
    >
      <h3 className="capitalize font-semibold">{name}</h3>
    </div>
  );
};

export default PokemonCard;
