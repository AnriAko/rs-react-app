type Props = {
  name: string;
  id: string;
  onSelect: (id: string) => void;
};

export const PokemonCard = ({ name, id, onSelect }: Props) => (
  <div
    onClick={() => onSelect(id)}
    className="bg-gray-800 text-white rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition max-h-15"
  >
    <h3 className="capitalize font-semibold">
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </h3>{' '}
  </div>
);
