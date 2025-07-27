import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App routing', () => {
  test('renders SearchPage on default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/search/i) || screen.getByText(/search/i)
    ).toBeInTheDocument();
  });

  test('renders PokemonDetailsCard on /details/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/loading/i) || screen.getByRole('heading')
    ).toBeInTheDocument();
  });

  test('renders AboutPage on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /about this project/i })
    ).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});
