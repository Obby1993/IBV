import Image from "next/image";
import React from "react";
import Banner from "./composant/banner/page";
import Event from "./composant/events/page";
import Coachs from "./composant/coachs/page";

export default function Home() {
  return (
    <main >
      <Banner />
      <Event />
      <Coachs />
    </main>
  );
}
