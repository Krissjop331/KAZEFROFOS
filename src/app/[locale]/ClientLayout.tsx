'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AuthProvider } from '@/app/[locale]/context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { NextIntlClientProvider } from 'next-intl';
import LoadingIndicator from '../LoadingIndicator';

// Определите тип для messages, если возможно
type Messages = Record<string, any>;

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: Messages; // Используйте конкретный тип для сообщений
  locale: string;
  pathname: string;
}

export default function ClientLayout({
  children,
  messages,
  locale,
  pathname
}: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>
          <LoadingIndicator />
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </NextIntlClientProvider>
    </Provider>
  );
}