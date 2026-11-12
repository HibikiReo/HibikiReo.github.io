export type Locale = 'zh' | 'en';

/** Every page exists at `/…` (English, the default) and `/zh/…` (Chinese). */
export const localePaths = () => [{ params: { locale: undefined } }, { params: { locale: 'zh' } }];

export function useLocale(url: URL) {
  const locale: Locale = /^\/zh(\/|$)/.test(url.pathname) ? 'zh' : 'en';
  const bare = url.pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
  return {
    locale,
    htmlLang: locale === 'en' ? 'en' : 'zh-CN',
    t: (zh: string, en: string) => (locale === 'en' ? en : zh),
    /** Prefix a site-absolute path with the current locale. */
    href: (path: string) => (locale === 'zh' && path.startsWith('/') ? `/zh${path}` : path),
    /** The same page in the other language. */
    alternate: locale === 'zh' ? bare : `/zh${bare}`,
  };
}
