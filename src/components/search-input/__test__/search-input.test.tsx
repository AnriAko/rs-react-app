import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '~/components/search-input/search-input';
import { TEST_IDS } from '~/constants/test-ids';
import { Theme } from '~/context/theme/theme-context';
import { ThemeProvider } from '~/context/theme/theme-provider';

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
    theme: Theme.light,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (props = {}) =>
    render(
      <ThemeProvider>
        <SearchInput {...defaultProps} {...props} />
      </ThemeProvider>
    );

  test('init values shown', () => {
    renderWithTheme();
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toHaveValue('20');
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toHaveValue('1');
  });

  test('limit change triggers setRequest', () => {
    renderWithTheme();
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputLimit), {
      target: { value: '5' },
    });
    expect(setRequestMock).toHaveBeenCalledWith(5, 1);
  });

  test('invalid limit ignored', () => {
    renderWithTheme();
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputLimit), {
      target: { value: 'abc' },
    });
    expect(setRequestMock).not.toHaveBeenCalled();
  });

  test('page change triggers setRequest', () => {
    renderWithTheme();
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputPage), {
      target: { value: '3' },
    });
    expect(setRequestMock).toHaveBeenCalledWith(20, 3);
  });

  test('invalid page ignored', () => {
    renderWithTheme();
    fireEvent.change(screen.getByTestId(TEST_IDS.search.inputPage), {
      target: { value: '-1' },
    });
    expect(setRequestMock).not.toHaveBeenCalled();
  });

  test('prev button works', () => {
    renderWithTheme();
    fireEvent.click(screen.getByTestId(TEST_IDS.search.btnPrev));
    expect(fetchMock).toHaveBeenCalledWith('prev-url');
  });

  test('prev button disabled', () => {
    const { rerender } = render(
      <ThemeProvider>
        <SearchInput {...defaultProps} prevUrl={null} />
      </ThemeProvider>
    );
    expect(screen.getByTestId(TEST_IDS.search.btnPrev)).toBeDisabled();

    rerender(
      <ThemeProvider>
        <SearchInput {...defaultProps} isLoading />
      </ThemeProvider>
    );
    expect(screen.getByTestId(TEST_IDS.search.btnPrev)).toBeDisabled();
  });

  test('next button works', () => {
    renderWithTheme();
    fireEvent.click(screen.getByTestId(TEST_IDS.search.btnNext));
    expect(fetchMock).toHaveBeenCalledWith('next-url');
  });

  test('next button disabled', () => {
    const { rerender } = render(
      <ThemeProvider>
        <SearchInput {...defaultProps} nextUrl={null} />
      </ThemeProvider>
    );
    expect(screen.getByTestId(TEST_IDS.search.btnNext)).toBeDisabled();

    rerender(
      <ThemeProvider>
        <SearchInput {...defaultProps} isLoading />
      </ThemeProvider>
    );
    expect(screen.getByTestId(TEST_IDS.search.btnNext)).toBeDisabled();
  });
});
