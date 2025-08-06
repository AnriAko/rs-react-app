import { createBrowserRouter } from 'react-router';
import { SearchPage } from '~pages/search-page';
import { NotFoundPage } from '~pages/not-found-page';
import { PokemonDetailsCard } from '../components/pokemon-details-card/pokemon-details-card';
import { AboutPage } from '~pages/about-page';
import { ROUTES_PATH } from './routes-path';
import { MainLayout } from 'layout/main-layout';

export const router = createBrowserRouter([
  {
    path: ROUTES_PATH.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: ROUTES_PATH.DETAILS,
        element: <PokemonDetailsCard />,
      },
      {
        path: ROUTES_PATH.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
