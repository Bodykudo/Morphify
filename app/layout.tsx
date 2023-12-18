import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Morphify',
  description:
    'Morphify: Your one-stop solution for hassle-free file conversion. Convert images, videos, and audio files effortlessly and for free. No limitations, just seamless transformation of your media into the format you need. Join Morphify today and unlock the power of versatile file conversion.',
  authors: { name: 'Abdallah Magdy' },
  keywords: ['File Converting', 'Images', 'Videos', 'Audio'],
  openGraph: {
    title: 'Morphify',
    type: 'website',
    images: ['https://morphify.vercel.app/mockup.png'],
    url: 'https://morphify.vercel.app/',
    description:
      'Morphify: Your one-stop solution for hassle-free file conversion. Convert images, videos, and audio files effortlessly and for free. No limitations, just seamless transformation of your media into the format you need. Join Morphify today and unlock the power of versatile file conversion.',
  },
  twitter: {
    title: 'Morphify',
    description:
      'Morphify: Your one-stop solution for hassle-free file conversion. Convert images, videos, and audio files effortlessly and for free. No limitations, just seamless transformation of your media into the format you need. Join Morphify today and unlock the power of versatile file conversion.',
    card: 'summary_large_image',
    creator: 'a_m_s666',
    images: ['https://morphify.vercel.app/mockup.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`dark:bg-dark ${inter.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          <main className='pt-32 min-h-screen lg:pt-36 2xl:pt-44 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl '>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
