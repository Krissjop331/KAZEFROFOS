import './globals.css';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientLayout from './ClientLayout';

// Определение типа для параметров
interface Params {
  locale: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = params;
  const messages = require(`../../../messages/${locale}.json`);

  // Базовые ключевые слова
  const baseKeywords = [
    'спортивное питание', 
    'добавки', 
    'здоровье', 
    'фитнес', 
    'протеин', 
    'витамины', 
    'минералы', 
    'энергетики', 
    'аминокислоты'
  ];

  return {
    title: messages.siteTitle || 'КАЗЕФРОФОС',
    description: messages.siteDescription || 'Description of your company and products',
    keywords: baseKeywords.join(', '),
    openGraph: {
      title: messages.siteTitle || 'КАЗЕФРОФОС',
      description: messages.siteDescription || 'Description of your company and products',
      images: ['/path-to-og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.siteTitle || 'КАЗЕФРОФОС',
      description: messages.siteDescription || 'Description of your company and products',
      images: ['/path-to-twitter-image.jpg'],
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = require(`../../../messages/${locale}.json`);
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href='/resources/logo.png' />
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              const storedKeywords = localStorage.getItem('productKeywords');
              if (storedKeywords) {
                const metaKeywords = document.querySelector('meta[name="keywords"]');
                if (metaKeywords) {
                  const baseKeywords = metaKeywords.getAttribute('content').split(', ');
                  const productKeywords = JSON.parse(storedKeywords);
                  const allKeywords = [...new Set([...baseKeywords, ...productKeywords])];
                  metaKeywords.setAttribute('content', allKeywords.join(', '));
                }
              }
            }
          `
        }} />
      </head>
      <body>
        <ClientLayout messages={messages} locale={locale} pathname={pathname}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}