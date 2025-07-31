import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFoundPage } from '@pages/not-found-page/not-found-page';
import { vi } from 'vitest';
import { ROUTES_PATH } from '@router/routes-path';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = (await vi.importActual('react-router')) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFoundPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders 404 message and button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /go to home/i });
    expect(button).toBeInTheDocument();
  });

  test('clicking button navigates to home', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /go to home/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES_PATH.ROOT);
  });
});
