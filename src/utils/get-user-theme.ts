import { cookies } from 'next/headers';
import { Theme, type theme } from '~/context/theme/types/theme-types';

export async function getUserThemeFromCookies(): Promise<theme> {
  try {
    const cookieStore = cookies();
    const cookieValue = (await cookieStore).get('theme')?.value;

    if (!cookieValue) return Theme.light;

    if (cookieValue === Theme.dark || cookieValue === Theme.light) {
      return cookieValue as theme;
    }

    return Theme.light;
  } catch {
    return Theme.light;
  }
}
