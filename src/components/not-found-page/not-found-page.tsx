import { useNavigate } from 'react-router';
import { ROUTES_PATH } from '../../router/routes-path';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-900">
      <div className="text-white font-bold text-center text-xl">
        <p>404 - Page Not Found</p>
        <button
          onClick={() => navigate(ROUTES_PATH.ROOT)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition hover:cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
