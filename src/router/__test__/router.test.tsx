import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { router } from '../router';
import { ROUTES_PATH } from '../routes-path';

describe('App Router', () => {
  function renderAt(path: string) {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: [path],
    });
    return render(<RouterProvider router={memoryRouter} />);
  }

  test('renders SearchPage on root path', () => {
    renderAt(ROUTES_PATH.ROOT);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  test('renders PokemonDetailsCard on details path', async () => {
    renderAt('/?details=1');
    expect(
      await screen.findByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('renders AboutPage on about path', () => {
    renderAt(ROUTES_PATH.ABOUT);
    expect(screen.getByText(/about this project/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown path', () => {
    renderAt('/some/unknown/path');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
