'use client';

import { Theme, useTheme } from '~/context/theme/theme-context';
import cl from 'classnames';
import Image from 'next/image';
import rssLogo from 'public/rss-logo.svg';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const { theme } = useTheme();
  const t = useTranslations('AboutPage');

  return (
    <div
      className={cl('min-h-screen px-6 py-8', {
        'bg-gray-100 text-gray-900': theme === Theme.light,
        'bg-gray-900 text-white': theme === Theme.dark,
      })}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">{t('title')}</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            {t('authorName', { name: 'Anri Ako' })}
          </h2>
          <p className="mt-2">
            Github:{' '}
            <a
              href="https://github.com/AnriAko"
              target="_blank"
              rel="noopener noreferrer"
              className={cl('underline', {
                'text-blue-600 hover:text-blue-800': theme === Theme.light,
                'text-blue-400 hover:text-blue-300': theme === Theme.dark,
              })}
            >
              https://github.com/AnriAko
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">{t('rsSchoolTitle')}</h2>
          <div className="text-lg flex items-center gap-2">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className={cl('underline flex items-center gap-2', {
                'text-blue-600 hover:text-blue-800': theme === Theme.light,
                'text-blue-400 hover:text-blue-300': theme === Theme.dark,
              })}
            >
              <Image
                src={rssLogo}
                alt="RS School Logo"
                width={48}
                height={48}
              />
              {t('rsSchoolLinkText')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
