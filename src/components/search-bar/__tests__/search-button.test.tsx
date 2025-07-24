import { render, screen, fireEvent } from '@testing-library/react';
import SearchButton from '../search-button';
import { vi } from 'vitest';

describe('SearchButton', () => {
  let handleClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleClickMock = vi.fn();
  });

  test('renders with default text "Search"', () => {
    render(<SearchButton handleClick={handleClickMock} />);
    const button = screen.getByTestId('search-pokemons-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Search');
  });

  test('renders with loading text "Loading..." when loading prop is true', () => {
    render(<SearchButton handleClick={handleClickMock} loading />);
    const button = screen.getByTestId('search-pokemons-button');
    expect(button).toHaveTextContent('Loading...');
  });

  test('button is disabled and styled accordingly when disabled prop is true', () => {
    render(<SearchButton handleClick={handleClickMock} disabled />);
    const button = screen.getByTestId('search-pokemons-button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-400');
  });

  test('calls handleClick once when clicked and not disabled', () => {
    render(<SearchButton handleClick={handleClickMock} />);
    const button = screen.getByTestId('search-pokemons-button');
    fireEvent.click(button);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call handleClick when disabled', () => {
    render(<SearchButton handleClick={handleClickMock} disabled />);
    const button = screen.getByTestId('search-pokemons-button');
    fireEvent.click(button);
    expect(handleClickMock).not.toHaveBeenCalled();
  });
});
