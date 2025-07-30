import { createBrowserRouter } from 'react-router';
import { SearchPage } from '../pages/search-page/search-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { PokemonDetailsCard } from '../components/pokemon-list/components/pokemon-details-card/pokemon-details-card';
import { AboutPage } from '../pages/about-page/about';
import { ROUTES_PATH } from './routes-path';

export const router = createBrowserRouter([
  {
    path: ROUTES_PATH.ROOT,
    Component: SearchPage,
    children: [
      {
        path: ROUTES_PATH.DETAILS,
        Component: PokemonDetailsCard,
      },
    ],
  },
  {
    path: ROUTES_PATH.ABOUT,
    Component: AboutPage,
  },
  {
    path: ROUTES_PATH.NOT_FOUND,
    Component: NotFoundPage,
  },
]);
