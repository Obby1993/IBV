import React from "react";
import Banner from "./composant/banner/page";
import EventPart from "./composant/eventPart/page";
import Coachs from "./composant/coachs/page";
import Footer from "./composant/footer/page";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";


export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <main >
      <Banner session={session}/>
      <EventPart />
      <Coachs />
      <Footer />
    </main>
  );
}
