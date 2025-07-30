import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AboutPage from '../about';
import { vi } from 'vitest';
import type * as RRDom from 'react-router';
import { ROUTES_PATH } from '../../../router/routes-path';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual: typeof RRDom = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AboutPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders main headings, links and author info', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About This Project'
    );
    expect(
      screen.getByRole('heading', { level: 2, name: /author/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
    expect(screen.getByText(/Anri Ako/i)).toBeInTheDocument();

    const githubLink = screen.getByRole('link', {
      name: /https:\/\/github\.com\/AnriAko/i,
    });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AnriAko');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const rssLink = screen.getByRole('link', { name: /RS School/i });
    expect(rssLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rssLink).toHaveAttribute('target', '_blank');
  });

  test('clicking "Back to Main" button calls navigate with "/"', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back to main/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES_PATH.ROOT);
  });
});
