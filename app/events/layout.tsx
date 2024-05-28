// app/events/layout.tsx
import React from 'react';
import Footer from "../composant/footer/page";
import Navbar from '../composant/navbar/navbar';  // Ajustez le chemin selon votre structure de fichiers
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className }>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
