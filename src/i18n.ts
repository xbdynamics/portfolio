import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'ar' | 'en')) {
    locale = routing.defaultLocale;
  }

  const messages = locale === 'ar' 
    ? (await import('@/messages/ar.json')).default 
    : (await import('@/messages/en.json')).default;

  return {
    locale,
    messages,
  };
});