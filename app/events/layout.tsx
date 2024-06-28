// app/events/layout.tsx
import React from 'react';
import { Inter } from "next/font/google";

import Navbar from '../composant/navbar/navbar';
import Footer from '../composant/footer/page';

// import { SessionProps } from '@/app/types'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import ClientLayout from "../composant/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

interface EventsLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export default async function EventsLayout(
  { children }: EventsLayoutProps) {
    const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className }>
        <ClientLayout session={session}>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
        </body>
    </html>
  );
}
