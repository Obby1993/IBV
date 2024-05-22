import React from "react";
import Banner from "./composant/banner/page";
import Event from "./composant/events/page";
import Coachs from "./composant/coachs/page";
import Footer from "./composant/footer/page";

export default function Home() {
  return (
    <main >
      <Banner />
      <Event />
      <Coachs />
      <Footer />

    </main>
  );
}
