import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/context/language-context';
import { Inter, Archivo_Black } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
});


export const metadata: Metadata = {
  title: 'AgriShield',
  description: 'Smart Farming for a Secure Future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
