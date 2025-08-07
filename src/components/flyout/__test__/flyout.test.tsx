import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from '~/components/flyout';
import * as reactRedux from 'react-redux';
import { vi } from 'vitest';

type Pokemon = {
  id: string;
  name: string;
  url: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

vi.mock('@context/theme/theme-context', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

import { clearAllPokemons } from '~/redux/pokemons/slice';

describe('Flyout component', () => {
  const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;
  const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
    useSelectorMock.mockReset();
  });

  const renderWithSelectedPokemons = (pokemons: Pokemon[]) => {
    useSelectorMock.mockReturnValue(pokemons);
    render(<Flyout />);
  };

  test('does not render if no selected pokemons', () => {
    renderWithSelectedPokemons([]);
    expect(screen.queryByText(/item/)).toBeNull();
  });

  test('renders the correct number of selected pokemons', () => {
    renderWithSelectedPokemons([
      { id: '1', name: 'Bulbasaur', url: 'url1' },
      { id: '2', name: 'Charmander', url: 'url2' },
    ]);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  test('renders singular form "item" when one selected', () => {
    renderWithSelectedPokemons([{ id: '1', name: 'Pikachu', url: 'url1' }]);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  test('dispatches clearAllPokemons action when "Unselect all" button clicked', () => {
    renderWithSelectedPokemons([{ id: '1', name: 'Squirtle', url: 'url1' }]);
    const button = screen.getByText('Unselect all');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(clearAllPokemons());
  });

  test('renders Download button as a button element', () => {
    renderWithSelectedPokemons([{ id: '1', name: 'Eevee', url: 'url1' }]);
    const downloadBtn = screen.getByText('Download');
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn.tagName.toLowerCase()).toBe('button');
  });
});
