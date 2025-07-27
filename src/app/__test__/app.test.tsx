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
      screen.getByRole('heading', { name: /pokemon search page/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId('search-input-limit')).toBeInTheDocument();
    expect(screen.getByTestId('search-input-page')).toBeInTheDocument();

    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });
});
