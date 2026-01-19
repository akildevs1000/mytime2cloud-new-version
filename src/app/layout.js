import "./globals.css";
import LeftMenu from '@/components/leftMenu';
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import { Space_Grotesk, Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${notoSans.variable} light`}>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-display bg-obsidian text-slate-900">
        <Header />
        <div className="flex h-screen overflow-hidden">
          <LeftMenu />
          <MainContentWrapper>
            {children}
          </MainContentWrapper>
        </div>
      </body>
    </html>
  );
}