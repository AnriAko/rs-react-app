import { createBrowserRouter } from 'react-router';
import SearchPage from '../components/search-page';
import NotFoundPage from '../components/not-found-page/not-found-page';
import PokemonDetailsCard from '../components/pokemon-list/pokemon-details-card';
import AboutPage from '../components/about-page/about';
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
