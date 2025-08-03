import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from '@components/flyout';
import * as reactRedux from 'react-redux';
import { vi } from 'vitest';

type SelectedItem = {
  id: string;
  name: string;
  url: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

vi.mock('@context/theme/theme-context', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('react-redux', () => {
  return {
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

describe('Flyout component', () => {
  const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;
  const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
    useSelectorMock.mockReset();
  });

  const renderWithSelectedItems = (items: SelectedItem[]) => {
    useSelectorMock.mockReturnValue(items);
    render(<Flyout />);
  };

  test('does not render if no selected items', () => {
    renderWithSelectedItems([]);
    expect(screen.queryByText(/item/)).toBeNull();
  });

  test('renders the correct number of selected items', () => {
    renderWithSelectedItems([
      { id: '1', name: 'Item 1', url: 'url1' },
      { id: '2', name: 'Item 2', url: 'url2' },
    ]);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  test('renders singular form "item" when one selected', () => {
    renderWithSelectedItems([{ id: '1', name: 'Item 1', url: 'url1' }]);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  test('dispatches clearAll action when "Unselect all" button clicked', () => {
    renderWithSelectedItems([{ id: '1', name: 'Item 1', url: 'url1' }]);
    const button = screen.getByText('Unselect all');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test('renders Download button as a button element', () => {
    renderWithSelectedItems([{ id: '1', name: 'Item 1', url: 'url1' }]);
    const downloadBtn = screen.getByText('Download');
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn.tagName.toLowerCase()).toBe('button');
  });
});
