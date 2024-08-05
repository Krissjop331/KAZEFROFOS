import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ru', 'kz'],
  defaultLocale: 'ru'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};