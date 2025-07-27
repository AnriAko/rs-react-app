interface Props {
  name: string;
  id: string;
  onSelect: (id: string) => void;
}

const PokemonCard = ({ name, id, onSelect }: Props) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className="bg-gray-800 text-white rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition max-h-15"
    >
      <h3 className="capitalize font-semibold">{name}</h3>
    </div>
  );
};

export default PokemonCard;
