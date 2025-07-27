import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchInput from '../search-input';
import { TEST_IDS } from '../../shared/constants/test-ids';

describe('SearchInput', () => {
  const fetchMock = vi.fn();
  const setRequestMock = vi.fn();

  const defaultProps = {
    limit: 20,
    page: 1,
    setSearchRequest: setRequestMock,
    isLoading: false,
    prevUrl: 'prev-url',
    nextUrl: 'next-url',
    fetchFromFullUrl: fetchMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('init values shown', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toHaveValue('20');
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toHaveValue('1');
  });

  test('limit change triggers setRequest', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputLimit), {
      target: { value: '5' },
    });
    expect(setRequestMock).toHaveBeenCalledWith(5, 1);
  });

  test('invalid limit ignored', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputLimit), {
      target: { value: 'abc' },
    });
    expect(setRequestMock).not.toHaveBeenCalled();
  });

  test('page change triggers setRequest', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputPage), {
      target: { value: '3' },
    });
    expect(setRequestMock).toHaveBeenCalledWith(20, 3);
  });

  test('invalid page ignored', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputPage), {
      target: { value: '-1' },
    });
    expect(setRequestMock).not.toHaveBeenCalled();
  });

  test('prev button works', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.click(screen.getByTestId(TEST_IDS.search.btnPrev));
    expect(fetchMock).toHaveBeenCalledWith('prev-url');
  });

  test('prev button disabled', () => {
    const { rerender } = render(
      <SearchInput {...defaultProps} prevUrl={null} />
    );
    expect(screen.getByTestId(TEST_IDS.search.btnPrev)).toBeDisabled();

    rerender(<SearchInput {...defaultProps} isLoading />);
    expect(screen.getByTestId(TEST_IDS.search.btnPrev)).toBeDisabled();
  });

  test('next button works', () => {
    render(<SearchInput {...defaultProps} />);
    fireEvent.click(screen.getByTestId(TEST_IDS.search.btnNext));
    expect(fetchMock).toHaveBeenCalledWith('next-url');
  });

  test('next button disabled', () => {
    const { rerender } = render(
      <SearchInput {...defaultProps} nextUrl={null} />
    );
    expect(screen.getByTestId(TEST_IDS.search.btnNext)).toBeDisabled();

    rerender(<SearchInput {...defaultProps} isLoading />);
    expect(screen.getByTestId(TEST_IDS.search.btnNext)).toBeDisabled();
  });
});
