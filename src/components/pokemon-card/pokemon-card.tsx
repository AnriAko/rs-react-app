import cl from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { toggleItem } from '@redux/selected-items-slice';
import { CustomCheckbox } from '@ui/custom-checkbox';

type Props = {
  name: string;
  id: string;
  theme: 'light' | 'dark';
  onSelect: (id: string) => void;
};

export const PokemonCard = ({ name, id, theme, onSelect }: Props) => {
  const dispatch = useDispatch();

  const isSelected = useSelector(
    (state: RootState) => !!state.selectedItems.items[id]
  );

  const handleToggle = () => {
    dispatch(
      toggleItem({
        id,
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      })
    );
  };

  return (
    <div
      className={cl('p-4 max-h-15 flex items-center gap-4 cursor-pointer', {
        'bg-gray-800 text-white hover:bg-gray-700': theme === 'dark',
        'bg-gray-200 text-gray-900 hover:bg-gray-300': theme === 'light',
      })}
      onClick={() => onSelect(id)}
    >
      <CustomCheckbox
        checked={isSelected}
        onChange={handleToggle}
        theme={theme}
        stopPropagation={true}
      />

      <h3 className="capitalize font-semibold">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
    </div>
  );
};
