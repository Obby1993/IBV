// app/components/ClientLayout.tsx

"use client"; // Indique que ce fichier est un composant client

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ClientLayoutProps {
  session: Session | null;
  children: React.ReactNode;
}

export default function ClientLayout({ session, children }: ClientLayoutProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
