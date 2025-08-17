'use client';

import cl from 'classnames';
import { usePokemonSelect } from '~/context/pokemon-select/pokemon-select-context';
import { Theme, theme } from '~/context/theme/theme-context';
import { usePathname, useRouter } from '~/lib/navigation';
import { CustomCheckbox } from '~/ui/custom-checkbox';

type Props = {
  name: string;
  id: string;
  theme: theme;
};

export const PokemonCard = ({ name, id, theme }: Props) => {
  const { selected, togglePokemon } = usePokemonSelect();
  const isSelected = !!selected[id];

  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    togglePokemon({
      id,
      name,
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    });
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSelect = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('details', id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cl('p-4 max-h-15 flex items-center gap-4 cursor-pointer', {
        'bg-gray-800 text-white hover:bg-gray-700': theme === Theme.dark,
        'bg-gray-200 text-gray-900 hover:bg-gray-300': theme === Theme.light,
      })}
      onClick={handleSelect}
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
