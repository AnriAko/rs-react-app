import cl from 'classnames';

type Props = {
  name: string;
  id: string;
  onSelect: (id: string) => void;
  theme: 'light' | 'dark';
};

export const PokemonCard = ({ name, id, onSelect, theme }: Props) => (
  <div
    onClick={() => onSelect(id)}
    className={cl('p-4 cursor-pointer transition max-h-15', {
      'bg-gray-800 text-white hover:bg-gray-700': theme === 'dark',
      'bg-gray-200 text-gray-900 hover:bg-gray-300': theme === 'light',
    })}
  >
    <h3 className="capitalize font-semibold">
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </h3>
  </div>
);
