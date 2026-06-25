import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'regg lost triangle lesson',
  description: 'The geometry of Gregg Fleishman — from a unit square to the 120° dihedral angle.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Grotesk:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
