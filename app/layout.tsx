import { Figtree } from 'next/font/google';

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import ModalProvider from '@/components/modal-provider';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Genius',
  description: 'AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
