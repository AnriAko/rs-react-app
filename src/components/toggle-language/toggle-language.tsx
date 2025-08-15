'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '~/lib/locales';
import { CustomButton } from '~/ui/custom-button';
import { useTheme } from '~/context/theme/theme-context';
import { Globe } from 'lucide-react';
import Image from 'next/image';

export const ToggleLanguage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function toggleLanguage() {
    const newLocale = currentLocale === locales.en ? locales.ru : locales.en;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
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
