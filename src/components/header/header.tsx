import { ROUTES_PATH } from '@router/routes-path';
import { Link } from 'react-router';

export const Header = () => (
  <header className="bg-gray-900 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <nav className="flex gap-6 text-lg font-medium">
        <Link
          to={ROUTES_PATH.ROOT}
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Search
        </Link>
        <Link
          to={ROUTES_PATH.ABOUT}
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          About
        </Link>
      </nav>
    </div>
  </header>
);
