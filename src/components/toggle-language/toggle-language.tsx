'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '~/lib/locales';
import { CustomButton } from '~/ui/custom-button';
import { useTheme } from '~/context/theme/theme-context';
import { Globe } from 'lucide-react';

export const ToggleLanguage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const currentLocale = useLocale();

  function toggleLanguage() {
    const newLocale = currentLocale === locales.en ? locales.ru : locales.en;
    document.cookie = `language=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;

    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/^\/(en|ru)/, `/${newLocale}`);
    router.push(url.toString());
  }

  return (
    <CustomButton
      onClick={toggleLanguage}
      theme={theme}
      className="flex items-center gap-2"
    >
      <Globe size={18} />

      {currentLocale === locales.en ? 'EN' : 'RU'}
    </CustomButton>
  );
};
