import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //domains: ['localhost'],
        domains: ['195.49.212.124'],
      },
    experimental: {
      appDir: true,
    },
    env: {
      API_URL: process.env.API_URL,
    },
};
 
export default withNextIntl(nextConfig);
