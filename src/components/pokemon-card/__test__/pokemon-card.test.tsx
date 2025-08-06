import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { PokemonCard } from '~components/pokemon-card/pokemon-card';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer, toggleItem } from '~redux/selected-items-slice';
import { ThemeProvider } from '~context/theme/theme-provider';
import { vi } from 'vitest';

describe('PokemonCard', () => {
  const mockOnSelect = vi.fn();

  const defaultProps = {
    name: 'pikachu',
    id: '25',
    theme: 'light' as const,
    onSelect: mockOnSelect,
  };

  let store: ReturnType<typeof configureStore>;
  let dispatchSpy: typeof store.dispatch;

  beforeEach(() => {
    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items: {},
        },
      },
    });

    const originalDispatch = store.dispatch;
    dispatchSpy = vi.fn((action) => originalDispatch(action));
    store.dispatch = dispatchSpy as typeof store.dispatch;

    render(
      <Provider store={store}>
        <ThemeProvider>
          <PokemonCard {...defaultProps} />
        </ThemeProvider>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('renders capitalized name', () => {
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('calls onSelect with correct id on card click', () => {
    fireEvent.click(screen.getByText('Pikachu'));
    expect(mockOnSelect).toHaveBeenCalledWith('25');
  });

  test('dispatches toggleItem action when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalledWith(
      toggleItem({
        id: '25',
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25',
      })
    );
  });

  test('checkbox is not checked if item is not selected in redux state', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
});

describe('PokemonCard with pre-selected item', () => {
  const mockOnSelect = vi.fn();

  const defaultProps = {
    name: 'pikachu',
    id: '25',
    theme: 'light' as const,
    onSelect: mockOnSelect,
  };

  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    cleanup();

    store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items: {
            '25': {
              id: '25',
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/25',
            },
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <PokemonCard {...defaultProps} />
        </ThemeProvider>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('checkbox is checked if item is selected in redux state', () => {
    const card = screen.getByText('Pikachu').closest('div');
    if (!card) throw new Error('Card container not found');

    const checkbox = within(card).getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});
