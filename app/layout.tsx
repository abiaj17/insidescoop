import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Inside Scoop — A Podcast by Aaryan Polisetty',
  description: 'Interviews, case studies, and the questions other podcasts skip.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
