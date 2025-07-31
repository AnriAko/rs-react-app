import { ROUTES_PATH } from '@router/routes-path';
import { useNavigate } from 'react-router';

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        About This Project
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Author</h2>
          <p className="text-lg">
            Created by <span className="font-bold">Anri Ako</span>
          </p>
          <p className="mt-2">
            GitHub:{' '}
            <a
              href="https://github.com/AnriAko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              https://github.com/AnriAko
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            RS School React course:
          </h2>
          <div className="text-lg flex items-center gap-2">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300 flex items-center gap-2"
            >
              <img
                src="rss-logo.svg"
                className="w-12 h-12"
                alt="RS School Logo"
              />
              RS School
            </a>
          </div>
        </section>

        <div className="pt-8">
          <button
            onClick={() => navigate(ROUTES_PATH.ROOT)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Main
          </button>
        </div>
      </div>
    </div>
  );
};
