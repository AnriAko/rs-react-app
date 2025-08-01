import { render, screen, fireEvent } from '@testing-library/react';
import { SearchButton } from '@components/search-button/search-button';
import { vi } from 'vitest';
import { TEST_IDS } from '@constants/test-ids';

describe('SearchButton', () => {
  let handleClickMock: ReturnType<typeof vi.fn>;
  const getButton = () => screen.getByTestId(TEST_IDS.bar.btnSearch);

  beforeEach(() => {
    handleClickMock = vi.fn();
  });

  test('renders default text', () => {
    render(<SearchButton handleClick={handleClickMock} />);
    const button = getButton();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Search');
  });

  test('shows loading text', () => {
    render(<SearchButton handleClick={handleClickMock} loading />);
    const button = getButton();
    expect(button).toHaveTextContent('Loading...');
  });

  test('is disabled and styled', () => {
    render(<SearchButton handleClick={handleClickMock} disabled />);
    const button = getButton();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-400');
  });

  test('calls handleClick when enabled', () => {
    render(<SearchButton handleClick={handleClickMock} />);
    const button = getButton();
    fireEvent.click(button);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call handleClick when disabled', () => {
    render(<SearchButton handleClick={handleClickMock} disabled />);
    const button = getButton();
    fireEvent.click(button);
    expect(handleClickMock).not.toHaveBeenCalled();
  });
});
