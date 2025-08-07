import cl from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '~/context/theme/theme-context';
import { togglePokemon } from '~/redux/pokemons/slice';
import { RootState } from '~/redux/store';
import { CustomCheckbox } from '~/ui/custom-checkbox';

type Props = {
  name: string;
  id: string;
  theme: Theme;
  onSelect: (id: string) => void;
};

export const PokemonCard = ({ name, id, theme, onSelect }: Props) => {
  const dispatch = useDispatch();

  const isSelected = useSelector(
    (state: RootState) => !!state.selectedPokemons.pokemons[id]
  );

  const handleToggle = () => {
    dispatch(
      togglePokemon({
        id,
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      })
    );
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cl('p-4 max-h-15 flex items-center gap-4 cursor-pointer', {
        'bg-gray-800 text-white hover:bg-gray-700': theme === 'dark',
        'bg-gray-200 text-gray-900 hover:bg-gray-300': theme === 'light',
      })}
      onClick={() => onSelect(id)}
    >
      <div onClick={handleCheckboxClick}>
        <CustomCheckbox
          checked={isSelected}
          onChange={handleToggle}
          theme={theme}
        />
      </div>

      <h3 className="capitalize font-semibold">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
    </div>
  );
};
