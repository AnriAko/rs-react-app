import { useTheme } from '@context/theme/theme-context';
import cl from 'classnames';

export const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={cl('min-h-screen px-6 py-8', {
        'bg-gray-100 text-gray-900': theme === 'light',
        'bg-gray-900 text-white': theme === 'dark',
      })}
    >
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
              className={cl('underline', {
                'text-blue-600 hover:text-blue-800': theme === 'light',
                'text-blue-400 hover:text-blue-300': theme === 'dark',
              })}
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
              className={cl('underline flex items-center gap-2', {
                'text-blue-600 hover:text-blue-800': theme === 'light',
                'text-blue-400 hover:text-blue-300': theme === 'dark',
              })}
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
      </div>
    </div>
  );
};
